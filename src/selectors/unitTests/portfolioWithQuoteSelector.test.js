import * as selectors from '../portfolioWithQuoteSelector';

describe('portfolioWithQuoteSelector', () => {
  const fakeTransactions = [
    {
      symbol: 'IBM',
      marketPrice: null,
      purchasePrice: 120,
      purchaseVolumn: 100,
      profitAndLoss: null
    }, {
      symbol: 'FB',
      marketPrice: null,
      purchasePrice: 300,
      purchaseVolumn: 1000,
      profitAndLoss: null
    }
  ];

  const fakeSuceededQuotes = {
    'IBM': {
      marketPrice: 140,
      isSuceeded: true
    }, 
    'FB': {
      marketPrice: 240,
      isSuceeded: true
    }
  };

  const fakeFailedAndSuceededQuotes = {
    'IBM': {
      marketPrice: NaN,
      isSuceeded: false
    }, 
    'FB': {
      marketPrice: 240,
      isSuceeded: true
    }
  };

  it('should return transactions with updated market price and PnL', () => {
    const portfolioWithQuote = selectors.portfolioWithQuoteSelector({
      portfolio: {
        transactions: fakeTransactions
      },
      quote: {
        quotes: fakeSuceededQuotes
      }
    });

    expect(portfolioWithQuote.length).toEqual(2);
    expect(portfolioWithQuote[0].symbol).toEqual('IBM');
    expect(portfolioWithQuote[0].marketPrice).toEqual(140);
    expect(portfolioWithQuote[0].profitAndLoss).toEqual(2000);
    expect(portfolioWithQuote[1].symbol).toEqual('FB');
    expect(portfolioWithQuote[1].marketPrice).toEqual(240);
    expect(portfolioWithQuote[1].profitAndLoss).toEqual(-60000);
  });

  
  it('should set market price and PnL to null if quote retrieval is failed', () => {
    const portfolioWithQuote = selectors.portfolioWithQuoteSelector({
      portfolio: {
        transactions: fakeTransactions
      },
      quote: {
        quotes: fakeFailedAndSuceededQuotes
      }
    });

    expect(portfolioWithQuote.length).toEqual(2);
    expect(portfolioWithQuote[0].symbol).toEqual('IBM');
    expect(portfolioWithQuote[0].marketPrice).toEqual(null);
    expect(portfolioWithQuote[0].profitAndLoss).toEqual(null);
    expect(portfolioWithQuote[1].symbol).toEqual('FB');
    expect(portfolioWithQuote[1].marketPrice).toEqual(240);
    expect(portfolioWithQuote[1].profitAndLoss).toEqual(-60000);
  });
});