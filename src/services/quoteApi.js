import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.alphavantage.co/',
  timeout: 5000
})

export const getStockQuote = (ticker) => {
  const url = `query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`;
  return instance.get(url);
}
