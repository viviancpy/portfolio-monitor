import { put, select, takeEvery } from 'redux-saga/effects';
import { addTransaction } from '../portfolioSaga';
import { testSaga } from 'redux-saga-test-plan';
import * as Types from '../../constants/ActionTypes';

describe('portfolioSaga', ()=>{
  describe('addTransaction', ()=>{
    const fakeAction = {
      transaction: {
        symbol: 'IBM'
      }
    }

    it('should Subscribe Symbol and add transaction', ()=>{
      testSaga(addTransaction, fakeAction)
        .next()
        .put({ type: Types.SUBSCRIBE_SYMBOL, symbol: fakeAction.transaction.symbol})
        .next()
        .put({ type: Types.PORTFOLIO_ADD_TRANSACTION , transaction: fakeAction.transaction })
        .next()
        .isDone()
    });

  });
});