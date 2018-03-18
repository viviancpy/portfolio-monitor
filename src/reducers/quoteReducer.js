import { ADD_QUOTE, REMOVE_QUOTE, UPDATE_QUOTE_SUCCEEDED, UPDATE_QUOTE_ERROR } from '../constants/ActionTypes'

const initialState = {
  quotes: {}
}

export default function quoteReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUOTE:
      return {
        ...state,
        quotes: {
          ...state.quotes,
          [action.symbol]: {
            isLoading: true,
            isError: false,
            isSuceeded: false,
            lastUpdated: null,
            marketPrice: null
          }
        }
      };
    case UPDATE_QUOTE_SUCCEEDED:
      if (!state.quotes.hasOwnProperty(action.symbol)){
        return {...state};
      }
      return {
        ...state,
        quotes: {
          ...state.quotes,
          [action.symbol]: {
            isLoading: false,
            isError: false,
            isSuceeded: true,
            lastUpdated: Date.now(),
            marketPrice: action.marketPrice
          }
        }
      };
    case UPDATE_QUOTE_ERROR:
        if (!state.quotes.hasOwnProperty(action.symbol)){
          return {...state};
        }
        return {
          ...state,
          quotes: {
            ...state.quotes,
            [action.symbol]: {
              isLoading: false,
              isError: true,
              isSuceeded: false,
              lastUpdated: Date.now(),
              marketPrice: null
            }
          }
        };
    case REMOVE_QUOTE:
      const { quotes: { [action.symbol]: deleted, ...quotes } } = state;
      return {
        ...state,
        quotes
      };
    default:
      return state
  }
}
