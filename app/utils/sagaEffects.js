// Andarist's implementation of takeLeading
// https://github.com/redux-saga/redux-saga/issues/589

import { fork, call, take } from 'redux-saga/effects'

export const takeLeading = (pattern, saga, ...args) => fork(function * () {
  while (true) {
    const action = yield take(pattern);
    yield call(saga, ...args.concat(action));
  }
});
