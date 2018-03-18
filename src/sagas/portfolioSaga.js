import { put, select, takeEvery } from 'redux-saga/effects';
import * as Types from '../constants/ActionTypes';

const addTransaction = function* addTransaction(action) {
  yield put({ type: Types.SUBSCRIBE_SYMBOL, symbol: action.transaction.symbol });
  yield put({ type: Types.PORTFOLIO_ADD_TRANSACTION , transaction: action.transaction });
}

const removeTransaction = function* removeTransaction(action) {
  const state = yield select();
  const tx = state.portfolio.transactions[action.transactionId];
  yield put({ type: Types.UNSUBSCRIBE_SYMBOL, symbol: tx.symbol});
  yield put({ type: Types.PORTFOLIO_REMOVE_TRANSACTION , transactionId: action.transactionId });
}

const protfolioSaga = function* protfolioSaga() {
  yield [
     takeEvery(Types.UI_ADD_TRANSACTION, addTransaction),
     takeEvery(Types.UI_REMOVE_TRANSACTION, removeTransaction)
  ]
}

export default protfolioSaga;
