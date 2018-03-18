import { combineReducers } from 'redux';
import symbolReducer from './symbolReducer';
import portfolioReducer from './portfolioReducer';
import quoteReducer from './quoteReducer';

const rootReducer = combineReducers({
  symbol: symbolReducer,
  portfolio: portfolioReducer,
  quote: quoteReducer
})

export default rootReducer
