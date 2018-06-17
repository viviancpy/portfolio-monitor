import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getStockQuote } from '../quoteApi';

describe('getStockQuote', () => {

  it('should have response to get data from given url', () => {
    var mock = new MockAdapter(axios);

    const fakeResponse = { response: true };
    mock.onGet(`query?function=TIME_SERIES_DAILY&symbol=AMZN&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`).reply(200, fakeResponse);
    
    getStockQuote('AMZN').then(response => {
      expect(response.data).toEqual(fakeResponse);
    });
  });
});