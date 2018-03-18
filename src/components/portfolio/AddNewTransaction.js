import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TableRow, TableCell } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import LibraryAddIcon from 'material-ui-icons/LibraryAdd';
import EditTransaction from './EditTransaction';
import './AddNewTransaction.css';

class AddNewTransaction extends Component {
  static propTypes = {
    onAddTransaction: PropTypes.func.isRequired
  }

  state = {
    isAddingNewTransaction: false
  }

  handleStartAddTransaction = e => {
    this.setState({isAddingNewTransaction: true});
  }

  handleConfirm = transaction => {
    this.props.onAddTransaction(transaction);
    this.setState({isAddingNewTransaction: false});
  }

  handleCancel = () => {
    this.setState({isAddingNewTransaction: false});
  }

  render() {
    const { isAddingNewTransaction } = this.state;

    return (
      <TableRow className="edit-row">
        { isAddingNewTransaction
          ? <EditTransaction onConfirm={this.handleConfirm} onCancel={this.handleCancel} />
          : <TableCell className="edit-cell" >
              <IconButton aria-label="Add Transaction" onClick={this.handleStartAddTransaction}>
                <LibraryAddIcon/>
              </IconButton>
            </TableCell> }
      </TableRow>
    );
  }
}

export default AddNewTransaction;
