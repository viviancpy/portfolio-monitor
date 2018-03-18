import { PORTFOLIO_LOADED, PORTFOLIO_ADD_TRANSACTION, PORTFOLIO_REMOVE_TRANSACTION } from '../constants/ActionTypes'

const initialState = {
  transactions: []
}

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case PORTFOLIO_LOADED:
      return {
        transactions: [...action.transactions]
      }
    case PORTFOLIO_ADD_TRANSACTION:
      return {
        transactions: [
          ...state.transactions,
          action.transaction
        ]
      }
    case PORTFOLIO_REMOVE_TRANSACTION:
      return {
        transactions: [
          ...state.transactions.slice(0, action.transactionId),
          ...state.transactions.slice(action.transactionId + 1)
        ]
      }
    default:
      return state
  }
}
