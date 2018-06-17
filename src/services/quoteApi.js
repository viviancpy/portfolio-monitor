import axios from 'axios';

const baseURL = 'https://www.alphavantage.co/';
const timeout =  5000; 

export const getStockQuote = (ticker) => {
  const url = `query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`;
  
  return axios({
    method: 'GET',
    baseURL: baseURL,
    url,
    timeout: timeout
  });
}
