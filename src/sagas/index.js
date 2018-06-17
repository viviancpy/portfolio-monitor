import { fork, all, spawn } from 'redux-saga/effects';
import initialSaga from './initialSaga';
import symbolSaga from './symbolSaga';
import { portfolioSaga } from './portfolioSaga';
import quoteSaga from './quoteSaga';

const rootSaga = function * rootSaga () {
  console.log('saga');
  yield all([
    fork(symbolSaga),
    fork(portfolioSaga),
    fork(quoteSaga)
  ]);

  yield spawn(initialSaga);
}

export default rootSaga;
