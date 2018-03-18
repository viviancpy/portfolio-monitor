import * as Types from '../constants/ActionTypes'

export const addTransaction = transaction => ({type: Types.UI_ADD_TRANSACTION, transaction: transaction})
export const removeTransaction = transactionId => ({type: Types.UI_REMOVE_TRANSACTION, transactionId: transactionId})
