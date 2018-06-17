import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Portfolio from '../components/portfolio/Portfolio';
import * as Actions from '../actions';
import { portfolioWithQuoteSelector } from '../selectors/portfolioWithQuoteSelector'


export class PortfolioContainer extends Component {
  static propTypes = {
    transactions: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  render(){
    const {actions, transactions} = this.props;
    return (
      <Portfolio
        transactions={transactions}
        onAddTransaction={actions.addTransaction}
        onRemoveTransaction={actions.removeTransaction}
      />
    )
  }
}

const mapStateToProps = state => ({
  transactions: portfolioWithQuoteSelector(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer)
