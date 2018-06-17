import { createSelector } from 'reselect'

const getTransactions = (state, props) =>
  state.portfolio.transactions

const getQuotes = (state, props) =>
  state.quote.quotes

export const portfolioWithQuoteSelector = createSelector(
  [getTransactions, getQuotes],
  (transactions, quotes) => {
    return transactions.map(tx => {
      const quote = quotes[tx.symbol];
      if (quote && quote.isSuceeded && !isNaN(quote.marketPrice)){
        tx['marketPrice'] = Number(quote.marketPrice);
        tx['profitAndLoss'] = (quote.marketPrice - tx.purchasePrice) * tx.purchaseVolumn;
      } else {
        tx['marketPrice'] = null;
        tx['profitAndLoss'] = null;
      }
      return tx;
    });
  }
)

