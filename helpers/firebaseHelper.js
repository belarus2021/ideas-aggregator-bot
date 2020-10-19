import admin from "firebase-admin";
import _ from 'lodash';
import {config as dotenv_config} from "dotenv"
import {BUY, MINSK} from "../constants/appEnums"
import {destructTransType, getTransType, isMatching, oppositeAction} from "./currencyHelper"
dotenv_config()

const parsedServiceAccount = process.env.FIREBASE_CONFIG_JSON
  ? JSON.parse(process.env.FIREBASE_CONFIG_JSON)
  : require("../.data/fb-service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(parsedServiceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

var db = admin.database().ref('server');

var usersRef = db.child("users");
var offersRef = db.child("offers");

export async function storeUser(user) {
  if (!user) throw new Error('no user to save');
  const userRef = usersRef.child(user.id);
  return userRef.update(user);
}

export async function storeOffer({user, offer, createdAt}) {
  const {action, city, currency} = offer;
  const {id: userId, username} = user;
  if (!user) throw new Error('no offer to save');
  const offerPath = `offers/${city}/${currency}/${action}`;
  const userOffersPath = `users/${userId}/offers`;
  const offerUid = db.child(offerPath).push().key;
  const userOfferPath = `${userOffersPath}/${offerUid}`;
  const offerPathWithUid = `${offerPath}/${offerUid}`;
  return db.update({
      [offerPathWithUid]: {...offer, id: offerUid, userId, username, createdAt},
      [userOfferPath]: {city, action, currency}
    })
}

export async function updateCity({city, userId}) {
  if (!userId || !city) throw new Error('no user or city in updateCity');
  const userRef = usersRef.child(userId);
  return userRef.update({city});
}

const parseUserOffers = (offers) => {
  return _.map(offers, (offer, id) => {
    return {...offer, id}
  })
}

async function fetchOffer(offer) {
  const {city, action, id, currency} = offer;
  const offerPath = `${city}/${currency}/${action}/${id}`;
  const snap = await offersRef.child(offerPath).once('value');
  return snap.val()
}

export async function listMyOffers(userId) {
  const myOffersPath = `${userId}/offers`;
  const myOffersRef = usersRef.child(myOffersPath);
  const userOffers = (await myOffersRef.once('value')).val();
  const parsedUserOffers = parseUserOffers(userOffers);
  const promises = _.map(parsedUserOffers, async userOffer => await fetchOffer(userOffer))
  return promises && promises.length > 0 ? await Promise.all(promises) : []
}

async function fetchCurrencyOffers({city, currency, action}) {
  const offersPath = `${city}/${currency}/${action}`;
  const snap = await offersRef.child(offersPath).once('value');
  return snap.val()
}

export async function listPotentialMatches(userId) {
  const myOffers = await listMyOffers(userId);
  const fbUser = await fetchUser(userId)
  if (Array.isArray(myOffers) && myOffers.length > 0) {
    const city = fbUser.city || myOffers[0].city || MINSK;
    const desiredTransactionTypes = _.reduce(myOffers, (acc, offer) => {
      const {currency, action} = offer;
      const transType = getTransType({currency, action: oppositeAction(action)});
      return !transType || acc[transType] ? acc : {...acc, [transType]: transType}
    }, {})
    const potentialMatchingOffersPromises = _.map(desiredTransactionTypes, async transType => {
      const {currency, action} = destructTransType(transType)
      const offers = await fetchCurrencyOffers({city, currency, action})
      return {[currency]: {[action]: offers}}
    })
    const relevantOffersArr = await Promise.all(potentialMatchingOffersPromises);
    const relevantOffersCollection = _.reduce(relevantOffersArr, (acc, currencyOffers) => {
      const key = Object.keys(currencyOffers)[0];
      return acc[key] ? {...acc, [key]: {...acc[key], ...currencyOffers[key]}} : {...acc, ...currencyOffers};
    },{})
    return {matches: findMatches({relevantOffersCollection, myOffers, userId}), city};
  }
  return {matches: []}
}

function findMatches({relevantOffersCollection, myOffers, userId}) {
  let potentialMatches = [];
  _.forEach(myOffers, myOffer => {
    const {action, currency} = myOffer;
    const potentialOffers = relevantOffersCollection[currency][oppositeAction(action)];
    _.forEach(potentialOffers, offer => {
      if (offer.userId !== userId && isMatching(myOffer, offer)) {
        potentialMatches.push({offer, myOffer})
      }
    })
  })
  return _.uniqBy(potentialMatches, 'id');
}

async function fetchUser(userId) {
  const userSnap = await usersRef.child(userId).once('value');
  return userSnap.val();
}

export async function rejectMatch({offer, user, timestamp}) {
  const {action, city, currency, id} = offer;
  if (!offer || !user) throw new Error('no match to save');
  const rejOfferPath = `${user.id}/rejectedOffers/${id}`;
  return usersRef.child(rejOfferPath).set({action, city, currency, timestamp})
}

export async function acceptMatch({offer, user, timestamp}) {
  const {action, city, currency, id} = offer;
  if (!offer || !user) throw new Error('no match to save');
  const approvedOfferPath = `${user.id}/acceptedOffers/${id}`;
  return usersRef.child(approvedOfferPath).set({action, city, currency, timestamp})
}
