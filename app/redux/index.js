import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { navigationMiddleware } from '../navigation/reduxMiddleware';
import nav from './nav';

export const createReducer = (injectedReducers) => {
  return combineReducers({
    nav: nav.reducer,
    ...injectedReducers,
  })
};

export default () => {
  const middlewares = [];

  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  middlewares.push(navigationMiddleware);

  const logger = createLogger();
  middlewares.push(logger);

  const store = compose(applyMiddleware(...middlewares))(createStore)(createReducer());
  store.injectedReducers = {};
  store.injectedSagas = {};
  store.runSaga = sagaMiddleware.run;

  return store;
}
