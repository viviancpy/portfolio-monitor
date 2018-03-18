import { put, select, takeEvery } from 'redux-saga/effects';
import * as Types from '../constants/ActionTypes';

const subscribe = function* subscribe(action) {
  const state = yield select();
  const count = state.symbol.symbolDependenciesCount[action.symbol];
  if (count && count === 1){
      yield put({ type: Types.ADD_QUOTE, symbol: action.symbol});
  }
}

const unsubscribe = function* unsubscribe(action) {
  const state = yield select();
  const isSymbolActive = state.symbol.symbolDependenciesCount.hasOwnProperty(action.symbol);
  if (!isSymbolActive){
      yield put({ type: Types.REMOVE_QUOTE, symbol: action.symbol});
  }
}

const symbolSaga = function* symbolSaga() {
  yield [
     takeEvery(Types.SUBSCRIBE_SYMBOL, subscribe),
     takeEvery(Types.UNSUBSCRIBE_SYMBOL, unsubscribe)
  ]
}

export default symbolSaga;
