import {BUY, SELL} from "../constants/appEnums"
import axios from 'axios';
import _ from 'lodash';
const NBRB_USD_URL = 'https://www.nbrb.by/api/exrates/rates/usd?parammode=2';
const NBRB_EUR_URL = 'https://www.nbrb.by/api/exrates/rates/eur?parammode=2';

export function getTransType({action, currency}) {
  return action && currency ? `${action}_${currency}` : null;
}

export function destructTransType(transType) {
  const currency = transType.split('_')[1]
  const action = transType.split('_')[0]
  return {action,currency}
}


export function isMatching(offer1, offer2) {
  const rateMargin = 0.2; //20%
  const amountMargin = 0.5; //50%
  const rateMatch = Math.abs(offer1.rate - offer2.rate) / offer1.rate <= rateMargin;
  const amountMatch = Math.abs(offer1.amount - offer2.amount) / offer1.amount <= amountMargin;
  return rateMatch && amountMatch;
}

export function oppositeAction(action) {
  if (action !== BUY && action !== SELL) throw new Error('invalid action type')
  return action === BUY ? SELL : BUY;
}

export async function fetchNBRBRatesUSD() {
  const usdRes = await axios.get(NBRB_USD_URL);
  return _.get(usdRes, 'data.Cur_OfficialRate')
}

export async function fetchNBRBRatesEUR() {
  const eurRes = await axios.get(NBRB_EUR_URL);
  return _.get(eurRes, 'data.Cur_OfficialRate')
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatRate(rate) {
  return Number.parseFloat(rate).toFixed(4)
}
