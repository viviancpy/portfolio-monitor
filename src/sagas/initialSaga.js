import { put } from 'redux-saga/effects'
import * as Types from '../constants/ActionTypes'
import { DEFAULT_PORTFOLIO } from '../constants/DefaultPortfolio';

const initialSaga = function* initialSaga() {
  for(let i=0; i<DEFAULT_PORTFOLIO.length; i++){
    yield put({type: Types.SUBSCRIBE_SYMBOL, symbol: DEFAULT_PORTFOLIO[i].symbol});
  }
  yield put({type: Types.PORTFOLIO_LOADED, transactions: DEFAULT_PORTFOLIO});
}

export default initialSaga;
