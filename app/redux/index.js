import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { all, fork, takeLatest } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { navigationMiddleware } from '../navigation/reduxMiddleware';
import nav from './nav';
import example from '../screens/example/PostDetailScreen/redux';

export default () => {
  const reducers = {
    nav: nav.reducer,
    example: example.reducer,
  };

  function * sagas () {
    yield all([
      example.sagas,
    ].reduce((acc, cur) => [...acc, ...cur]))
  }

  const middlewares = [];

  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  middlewares.push(navigationMiddleware);

  const logger = createLogger();
  middlewares.push(logger);

  const store = compose(applyMiddleware(...middlewares))(createStore)(combineReducers(reducers));

  sagaMiddleware.run(sagas);

  return store;
}
