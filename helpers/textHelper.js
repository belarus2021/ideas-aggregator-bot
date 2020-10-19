import {
  BUY_EUR,
  BUY_USD,
  CITIES_DICT,
  SELL_EUR,
  SELL_USD
} from "../constants/appEnums"
import {
  BUY_EUR_WORD,
  BUY_USD_WORD,
  SELL_EUR_WORD,
  SELL_USD_WORD
} from "../constants/localizedStrings"

export function getCityWord(city) {
  return CITIES_DICT[city].word
}

export function getActionPhrase(action) {
  let word;
  switch (action) {
    case BUY_USD:
      word = BUY_USD_WORD;
      break;
    case BUY_EUR:
      word = BUY_EUR_WORD;
      break;
    case SELL_USD:
      word = SELL_USD_WORD;
      break;
    case SELL_EUR:
      word = SELL_EUR_WORD;
      break;
  }
  return word;
}
