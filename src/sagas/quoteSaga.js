import { put, call, select, takeEvery } from 'redux-saga/effects';
import * as Types from '../constants/ActionTypes';
import * as Api from '../services/quoteApi';

export const loadQuoteFromService = function* loadQuoteFromService(action) {
  const state = yield select();
  const count = state.symbol.symbolDependenciesCount[action.symbol];
  if (count && count === 1){
    try {
      const quote = yield call(Api.getStockQuote, action.symbol);
      const lookupKey = quote['data']['Meta Data']['3. Last Refreshed'];
      if (lookupKey){
        const closePrice = quote['data']['Time Series (Daily)'][lookupKey]['4. close'];
        if (!isNaN(closePrice)){
          yield put({type: Types.UPDATE_QUOTE_SUCCEEDED, symbol: action.symbol, marketPrice: Number(closePrice)});
        } else {
          throw new Error(`Stock price is not numeric. Value=${JSON.stringify(closePrice)}`);
        }
      }
    } catch (e) {
      console.error(e);
      yield put({type: Types.UPDATE_QUOTE_ERROR, symbol: action.symbol});
    }
  }
}

export const quoteSaga = function* quoteSaga() {
  yield [
     takeEvery(Types.ADD_QUOTE, loadQuoteFromService)
  ]
}

