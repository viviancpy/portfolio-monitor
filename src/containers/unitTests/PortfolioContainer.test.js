import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import * as actions from '../../actions';
import * as Types from '../../constants/ActionTypes'
import * as selectors from '../../selectors/portfolioWithQuoteSelector';
import PortfolioContainer, {PortfolioContainer as PortfolioContainerComponent} from '../PortfolioContainer';
import Portfolio from '../../components/portfolio/Portfolio';

const mockStore = configureStore();

describe('PortfolioContainer', () => {
  let store;

  const fakeAddTransaction = { type: Types.UI_ADD_TRANSACTION, transaction: null };
  const fakeRemoveTransaction = { type: Types.UI_REMOVE_TRANSACTION, transactionId: null };
  const fakePortfolioWithQuote = [];

  beforeEach(() => {
    store = mockStore({});
    jest.spyOn(store, 'dispatch');
    jest.spyOn(actions, 'addTransaction').mockImplementation(() => fakeAddTransaction);
    jest.spyOn(actions, 'removeTransaction').mockImplementation(() => fakeRemoveTransaction);
    
    jest.spyOn(selectors, 'portfolioWithQuoteSelector').mockImplementation(() => fakePortfolioWithQuote);
  });

  it('should render Portfolio Component and pass transactions properties from store', () => {
    jest.spyOn(Portfolio.prototype, 'render')
      .mockImplementation(() => <div></div>);
    const container = ReactTestUtils.renderIntoDocument(<PortfolioContainer store={store} />);
    const childComponents = ReactTestUtils.scryRenderedComponentsWithType(container, Portfolio);
    expect(childComponents.length).toEqual(1);
    expect(childComponents[0].props.transactions).toEqual(fakePortfolioWithQuote);
  });

  it('should map removeTransaction to dispatch action', () => {
    const wrapper = shallow(<PortfolioContainer store={store} />);
    wrapper.props().onRemoveTransaction();
    expect(store.dispatch).toHaveBeenCalledWith(fakeRemoveTransaction);
  });

  it('should map addTransaction to dispatch action', () => {
    const wrapper = shallow(<PortfolioContainer store={store} />);
    wrapper.props().onAddTransaction();
    expect(store.dispatch).toHaveBeenCalledWith(fakeAddTransaction);
  });

  describe('componentWillReceiveProps', ()=>{
    const fakeTxSmallPositive = {
      symbol: 'IBM',
      marketPrice: 100,
      profitAndLoss: 200
    };

    const fakeTxSmallNegative = {
      symbol: 'IBM',
      marketPrice: 100,
      profitAndLoss: -200
    }

    const fakeTxLargePositive = {
      symbol: 'IBM',
      marketPrice: 100,
      profitAndLoss: 2000
    };

    const fakeTxLargeNegative = {
      symbol: 'IBM',
      marketPrice: 100,
      profitAndLoss: -2000
    }

    const cases = [{
      caseName: 'should set totalPnLAlert state to true if combine two transactions having loss over threshold',
      fakeTransactions: [fakeTxLargeNegative, fakeTxSmallPositive],
      expectedTotalPnLAlert: true
    }, {
      caseName: 'should set totalPnLAlert state to true if only have negative transactions',
      fakeTransactions: [fakeTxLargeNegative, fakeTxSmallNegative],
      expectedTotalPnLAlert: true
    }, {
      caseName: 'should set totalPnLAlert state to false if only have positive transactions',
      fakeTransactions: [fakeTxSmallPositive, fakeTxLargePositive],
      expectedTotalPnLAlert: false
    }, {
      caseName: 'should set totalPnLAlert state to false if combine two transactions having loss below threshold',
      fakeTransactions: [fakeTxSmallNegative, fakeTxLargePositive],
      expectedTotalPnLAlert: false
    }]

    cases.forEach(c => {
      it(c.caseName, () => {

        const wrapper = document.createElement('div');
        let component = ReactDOM.render(<PortfolioContainerComponent transactions={[]} 
          onAddTransaction={()=>{}} onRemoveTransaction={()=>{}} />, wrapper);
        
        expect(component.state.totalPnLAlert).toEqual(false);
  
        ReactDOM.render(<PortfolioContainerComponent transactions={c.fakeTransactions} 
          onAddTransaction={()=>{}} onRemoveTransaction={()=>{}} />, wrapper);

        expect(component.state.totalPnLAlert).toEqual(c.expectedTotalPnLAlert);
      });

    })

  });
});
