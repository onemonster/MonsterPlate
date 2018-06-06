import * as React from 'react';
import { all } from 'redux-saga/effects';
import { createReducer } from '../redux';
import example from '../screens/example/PostDetailScreen/redux';

export default (key, reducer, saga) => (WrappedComponent) => {
  class Injector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static displayName = `withRedux(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;
    static contextTypes = {
      store: () => {},
    };

    componentWillMount() {
      const { store } = this.context;
      if (store.injectedReducers[key] !== reducer) {
        store.injectedReducers[key] = reducer;
        store.replaceReducer(createReducer(store.injectedReducers));
      }
      if (store.injectedSagas[key] !== saga) {
        store.injectedSagas[key] = saga;
        store.runSaga(
          function * () {
            yield all(saga);
          }
        );
      }
    };

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  return Injector;
}
