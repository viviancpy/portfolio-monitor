import { put, call, select, takeEvery } from 'redux-saga/effects';
import { loadQuoteFromService } from '../quoteSaga';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as Types from '../../constants/ActionTypes';
import * as Api from '../../services/quoteApi';


describe('quoteSaga', ()=>{
  describe('loadQuoteFromService', ()=>{
    const fakeAction = {
      symbol: 'IBM'
    }

    const fakeSelect = {
      symbol: {
        symbolDependenciesCount:{
          'IBM': 1
        }
      }
    }

    const fakeQuote = {
      data:{
        'Meta Data': {
          '3. Last Refreshed': '11/06/2018'
        },
        'Time Series (Daily)': {
          '11/06/2018': {
            '4. close': '120'
          }
        }
      }
    }

    const fakeInvalidQuote = {
      data:{
        'Meta Data': {
          '3. Last Refreshed': '11/06/2018'
        },
        'Time Series (Daily)': {
          '11/06/2018': {
            '4. close': 'NaN'
          }
        }
      }
    }

    it('should expect UPDATE_QUOTE_SUCCEEDED if quote is returned from API', () => {
      /* 
      * With the .provide() method from expectSaga
      * you can by pass in all expected values
      * and test only your saga's final effect.
      */
      return expectSaga(loadQuoteFromService, fakeAction)
        .provide([
          [select(), fakeSelect],
          [call(Api.getStockQuote, fakeAction.symbol), fakeQuote]
        ])
        .put({type: Types.UPDATE_QUOTE_SUCCEEDED, symbol: 'IBM', marketPrice: 120})
        .run();
    });

    it('should expect throw if close price is not valid', () => {
      const expectedError = new Error(`Stock price is not numeric. Value=NaN`);
      return expectSaga(loadQuoteFromService, fakeAction)
        .provide([
          [select(), fakeSelect],
          [call(Api.getStockQuote, fakeAction.symbol), fakeInvalidQuote]
        ])
        .put({type: Types.UPDATE_QUOTE_ERROR, symbol: 'IBM'})
        .run();
    });
  });
});
