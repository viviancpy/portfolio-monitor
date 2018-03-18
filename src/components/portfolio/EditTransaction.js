import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { TableCell } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import History from 'material-ui-icons/History';
import Done from 'material-ui-icons/Done';
import HighlightOffIcon from 'material-ui-icons/HighlightOff';
import './EditTransaction.css';

class EditTransaction extends PureComponent {
  static propTypes = {
    symbol: PropTypes.string,
    purchaseVolumn: PropTypes.number,
    purchasePrice: PropTypes.number,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  static defaultProps = {
    symbol: '',
    purchaseVolumn: 0,
    purchasePrice: 0
  }

  state = {
    symbolInput: EditTransaction.defaultProps.symbol,
    symbolInputError: {isError: false, errorText: ''},
    purchaseVolumnInput: EditTransaction.defaultProps.purchaseVolumn,
    purchaseVolumnInputError: {isError: false, errorText: ''},
    purchasePriceInput: EditTransaction.defaultProps.purchasePrice,
    purchasePriceInputError: {isError: false, errorText: ''},
  }

  handleChangeSymbol = e => {
    if ((e.target.value.trim()).length === 0){
      this.setState({
        symbolInputError: {
          isError: true,
          errorText: 'Symbol is empty'
        }
      });
    } else if (e.target.value.length > 7) {
      this.setState({
        symbolInputError: {
          isError: true,
          errorText: 'Symbol is too long (> 7 chars)'
        }
      });
    } else {
      this.setState({
        symbolInputError: {
          isError: false,
          errorText: ''
        }
      });
    }
    this.setState({symbolInput: e.target.value});
  }

  handleChangepurchaseVolumn = e => {
    if (isNaN(e.target.value)){
      this.setState({
        purchaseVolumnInputError: {
          isError: true,
          errorText: 'Enter numericals'
        }
      });
    } else if (e.target.value != parseInt(e.target.value, 10)){
      this.setState({
        purchaseVolumnInputError: {
          isError: true,
          errorText: 'Enter integer value'
        }
      });
    } else {
      this.setState({
        purchaseVolumnInputError: {
          isError: false,
          errorText: ''
        }
      });
    }
    this.setState({purchaseVolumnInput: e.target.value});
  }

  handleChangePurchasePrice = e => {
    if (isNaN(e.target.value)){
      this.setState({
        purchasePriceInputError: {
          isError: true,
          errorText: 'Enter numericals'
        }
      });
    } else if (Number(e.target.value) < 0){
      this.setState({
        purchasePriceInputError: {
          isError: true,
          errorText: 'Enter positive value'
        }
      });
    } else {
      this.setState({
        purchasePriceInputError: {
          isError: false,
          errorText: ''
        }
      })
    }
    this.setState({purchasePriceInput: e.target.value});
  }

  handleReset = e => {
    this.resetState();
  }

  handleCancel = e => {
    this.resetState();
    this.props.onCancel();
  }

  handleConfirm = e => {
    this.props.onConfirm({
      symbol: this.state.symbolInput.trim(),
      purchaseVolumn: Number(this.state.purchaseVolumnInput),
      purchasePrice: Number(this.state.purchasePriceInput)
    });
    this.resetState();
  }

  resetState = () => {
    this.setState({
      symbolInput: EditTransaction.defaultProps.symbol,
      purchaseVolumnInput: EditTransaction.defaultProps.purchaseVolumn,
      purchasePriceInput: EditTransaction.defaultProps.purchasePrice
    });
  }

  render() {
    const { symbolInput, symbolInputError, purchaseVolumnInput, purchaseVolumnInputError, purchasePriceInput, purchasePriceInputError } = this.state;
    const isFormError = symbolInputError.isError || purchaseVolumnInputError.isError || purchasePriceInputError.isError;
    const isInputReady = symbolInput.trim() && purchaseVolumnInput && purchasePriceInput;
    const isConfirmDisabled = isFormError||!isInputReady;
    return (
      [
        <TableCell key="cancel" className="edit-cell" >
          <IconButton aria-label="Cancel Add Transaction" onClick={this.handleCancel}>
            <HighlightOffIcon/>
          </IconButton>
        </TableCell>,
        <TableCell key="symbol" className="edit-cell">
          <TextField className="input-transaction"
            required
            label="Symbol"
            error={symbolInputError.isError}
            placeholder="Symbol (eg FB)"
            margin="normal"
            value={symbolInput}
            helperText={symbolInputError.isError ? symbolInputError.errorText : ''}
            onChange={this.handleChangeSymbol}
          />
        </TableCell>,
        <TableCell key="purchaseVolumn" className="edit-cell">
          <TextField className="input-transaction"
            required
            error={purchaseVolumnInputError.isError}
            label="Shares Held"
            placeholder="Shares Held (eg 1000)"
            margin="normal"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={purchaseVolumnInput}
            helperText={purchaseVolumnInputError.isError ? purchaseVolumnInputError.errorText : ''}
            onChange={this.handleChangepurchaseVolumn}
          />
        </TableCell>,
        <TableCell key="purchasePrice" className="edit-cell">
          <TextField className="input-transaction"
            required
            error={purchasePriceInputError.isError}
            label="Purchase Price"
            placeholder="Enter Price (eg 10.20)"
            margin="normal"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={purchasePriceInput}
            helperText={purchasePriceInputError.isError ? purchasePriceInputError.errorText : ''}
            onChange={this.handleChangePurchasePrice}
          />
        </TableCell>,
      <TableCell key="reset" className="edit-cell">
        <Button className="reset-transaction" variant="raised" color="primary" disableRipple={true} onClick={this.handleReset}>
          Reset
          <History className="button-image" />
        </Button>
      </TableCell>,
      <TableCell key="confirm" className="edit-cell">
        <Button className="confirm-transaction" variant="raised" color="primary" disableRipple={true} disabled={isConfirmDisabled} onClick={this.handleConfirm}>
          Confirm
          <Done className="button-image" />
        </Button>
      </TableCell>
      ]
    );
  }
}

export default EditTransaction;
