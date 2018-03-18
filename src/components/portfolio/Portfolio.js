import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableFooter, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Transaction from './Transaction';
import AddNewTransaction from './AddNewTransaction';
import './Portfolio.css';

class Portfolio extends Component {
  static propTypes = {
    transactions: PropTypes.array.isRequired,
    onRemoveTransaction: PropTypes.func.isRequired,
    onAddTransaction: PropTypes.func.isRequired
  }

  static defaultProps = {
    isLoading: true,
    transactions: []
  }

  handleAddNewTransaction = e => {
    this.setState({isAddingNewTransaction: true})
  }

  render() {
    const { transactions, onRemoveTransaction, onAddTransaction } = this.props;
    const transactionComponents = transactions.map((tx, idx) =>
      <Transaction
        key={idx}
        transactionId={idx}
        symbol={tx.symbol}
        purchaseVolumn={tx.purchaseVolumn}
        purchasePrice={tx.purchasePrice}
        marketPrice={tx.marketPrice}
        profitAndLoss={tx.profitAndLoss}
        onRemoveTransaction={onRemoveTransaction}
      />
    );
    return (
      <Paper className="portfolio-main">
        <Table className="portfolio-table">
          <TableHead className="portfolio-table-header">
            <TableRow>
              <TableCell className="cell-icon-button"></TableCell>
              <TableCell className="cell-symbol">Symbol</TableCell>
              <TableCell className="cell-purchase-volumn" numeric>Shares Held</TableCell>
              <TableCell className="cell-purchase-price" numeric>Purchase Price</TableCell>
              <TableCell className="cell-current-price" numeric>Last Market Price</TableCell>
              <TableCell className="cell-pnl" numeric>Profit/Loss</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionComponents}
          </TableBody>
          <TableFooter>
            <AddNewTransaction onAddTransaction={onAddTransaction} />
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

export default Portfolio;
