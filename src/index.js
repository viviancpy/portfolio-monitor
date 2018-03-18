import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/App';
import rootReducer from './reducers';
import rootSaga from './sagas';
import './index.css';
import "typeface-roboto";

const appRouterMiddleware = routerMiddleware(browserHistory);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(appRouterMiddleware), applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
