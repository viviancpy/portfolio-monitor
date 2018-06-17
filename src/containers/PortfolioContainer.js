import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Portfolio from '../components/portfolio/Portfolio';
import { addTransaction, removeTransaction } from '../actions';
import { portfolioWithQuoteSelector } from '../selectors/portfolioWithQuoteSelector'


export class PortfolioContainer extends Component {
  static propTypes = {
    transactions: PropTypes.array.isRequired,
    onAddTransaction: PropTypes.func.isRequired,
    onRemoveTransaction: PropTypes.func.isRequired
  }

  render(){
    const {onAddTransaction, onRemoveTransaction, transactions} = this.props;
    return (
      <Portfolio
        transactions={transactions}
        onAddTransaction={onAddTransaction}
        onRemoveTransaction={onRemoveTransaction}
      />
    )
  }
}

const mapStateToProps = state => ({
  transactions: portfolioWithQuoteSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onAddTransaction: (tx) => dispatch(addTransaction(tx)),
  onRemoveTransaction: (tx) => dispatch(removeTransaction(tx)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer)
