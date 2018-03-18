import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import logo from '../../assets/logo.svg';
import PortfolioContainer from '../../containers/PortfolioContainer';
import './App.css';

class App extends Component {

  render() {
    const theme = createMuiTheme({
      props: {
        MuiButtonBase: {
          disableRipple: true,
        },
      },
    });
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">
              <img src={logo} alt="logo" />
              <span>Stock Portfolio Monitor</span>
            </h1>
          </header>
          <div className="App-body">
            <PortfolioContainer />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
