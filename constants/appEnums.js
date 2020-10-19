import {
  GET_NBRB_USD_WORD,
  GET_NBRB_EUR_WORD,
  CHOOSE_CITY_WORD,
  LIST_OFFERS_WORD,
  LIST_POTENTIAL_MATCHES_WORD,
  SUBMIT_OFFER_WORD,
  MINSK_WORD,
  GRODNO_WORD,
  BOBRUYSK_WORD,
  BARANOVICHI_WORD,
  ZHODINO_WORD,
  ORSHA_WORD, PINSK_WORD, MOZYR_WORD, GOMEL_WORD, FEEDBACK_WORD
} from "./localizedStrings"

// currencies
export const BUY = "BUY";
export const SELL = "SELL";
export const USD = "USD";
export const EUR = "EUR";
export const BYN = "BYN";

// actions
export const BUY_USD = `${BUY}_${USD}`;
export const BUY_EUR = `${BUY}_${EUR}`;
export const SELL_USD = `${SELL}_${USD}`;
export const SELL_EUR = `${SELL}_${EUR}`;

// cities
export const MINSK = "MINSK";
export const GRODNO = "GRODNO";
export const BOBRUYSK = "BOBRUYSK";
export const BARANOVICHI = "BARANOVICHI";
export const ZHODINO = "ZHODINO";
export const ORSHA = "ORSHA";
export const PINSK = "PINSK";
export const MOZYR = "MOZYR";
export const GOMEL = "GOMEL";

export const CITIES_DICT = {
  [MINSK]: {value: MINSK, word: MINSK_WORD},
  [BARANOVICHI]: {value: BARANOVICHI, word: BARANOVICHI_WORD},
  [BOBRUYSK]: {value: BOBRUYSK, word: BOBRUYSK_WORD},
  [GOMEL]: {value: GOMEL, word: GOMEL_WORD},
  [GRODNO]: {value: GRODNO, word: GRODNO_WORD},
  [ZHODINO]: {value: ZHODINO, word: ZHODINO_WORD},
  [MOZYR]: {value: MOZYR, word: MOZYR_WORD},
  [ORSHA]: {value: ORSHA, word: ORSHA_WORD},
  [PINSK]: {value: PINSK, word: PINSK_WORD},
};

// match approve/reject
export const REJECT_MATCH = 'REJECT_MATCH';
export const APPROVE_MATCH = 'APPROVE_MATCH';

// main menu items
export const SUBMIT_OFFER = SUBMIT_OFFER_WORD;
export const LIST_OFFERS = LIST_OFFERS_WORD;
export const LIST_POTENTIAL_MATCHES = LIST_POTENTIAL_MATCHES_WORD;
export const CHOOSE_CITY = CHOOSE_CITY_WORD;
export const GET_NBRB_USD = GET_NBRB_USD_WORD;
export const GET_NBRB_EUR = GET_NBRB_EUR_WORD;

export const MAIN_MENU_OPTIONS = {
  [SUBMIT_OFFER]: SUBMIT_OFFER,
  [LIST_OFFERS]: LIST_OFFERS,
  [LIST_POTENTIAL_MATCHES]: LIST_POTENTIAL_MATCHES,
  [CHOOSE_CITY]: CHOOSE_CITY,
  [GET_NBRB_USD]: GET_NBRB_USD,
  [GET_NBRB_EUR]: GET_NBRB_EUR,
  [FEEDBACK_WORD]: FEEDBACK_WORD,
}

// callbacks
export const MAIN_MENU = 'MAIN_MENU';
export const SUGGEST_NEW_CITY = 'SUGGEST_NEW_CITY';
