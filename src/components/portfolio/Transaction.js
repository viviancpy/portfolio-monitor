import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { TableRow, TableCell } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import './Transaction.css';

class Transaction extends PureComponent {
  static propTypes = {
    transactionId: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired,
    purchaseVolumn: PropTypes.number.isRequired,
    purchasePrice: PropTypes.number.isRequired,
    onRemoveTransaction: PropTypes.func.isRequired
  }

  static defaultProps = {
    symbol: "",
    purchaseVolumn: 0,
    purchasePrice: 0
  }

  handleRemove = e => {
    this.props.onRemoveTransaction(this.props.transactionId);
  }

  render() {
    const { symbol, purchaseVolumn, purchasePrice, marketPrice, profitAndLoss } = this.props;
    return (
      <TableRow className="transaction-row">
        <TableCell className="transaction-cell action-button">
          <IconButton aria-label="Delete" disableRipple={true} onClick={this.handleRemove}>
            <DeleteIcon/>
          </IconButton>
        </TableCell>
        <TableCell  className="transaction-cell symbol">{symbol}</TableCell>
        <TableCell className="transaction-cell purchase-volumn" numeric>{(purchaseVolumn && purchaseVolumn.toLocaleString('EN-US')) || 'N/A'}</TableCell>
        <TableCell className="transaction-cell purchase-price" numeric>{(purchasePrice && purchasePrice.toLocaleString('EN-US')) || 'N/A'}</TableCell>
        <TableCell className="transaction-cell market-price" numeric>{(marketPrice && marketPrice.toLocaleString('EN-US')) || 'N/A'}</TableCell>
        <TableCell className="transaction-cell profit-and-loss" numeric>{(profitAndLoss && profitAndLoss.toLocaleString('EN-US')) || 'N/A'}</TableCell>
      </TableRow>
    );
  }
}

export default Transaction;
