import Immutable from 'seamless-immutable';
import { put } from 'redux-saga/effects'
import { takeLeading } from '../../../utils/sagaEffects'
import { createActions, createReducer } from '../../../services/reduxer';
import { exampleRequest } from '../../../services/api';

// Redux Logic

export const { actions, types } = createActions('PostDetailScreen', {
  getPost: {
    request: ['id'],
    success: ['post'],
    failure: ['error'],
  },
});

const initialState = Immutable({
  post: null,
  isFetching: false,
  error: null,
});

export const reducer = createReducer(initialState, {
  [types.GET_POST_REQUEST]: (state) => state.merge({ isFetching: true, error: null }),
  [types.GET_POST_SUCCESS]: (state, { post }) => state.merge({ post, isFetching: false, error: null }),
  [types.GET_POST_FAILURE]: (state, { error }) => state.merge({ isFetching: false, error }),
});

// Saga Logic

function * getPost({ id }) {
  try {
    const response = yield exampleRequest.get(`/posts/${id}`);
    yield put(actions.getPostSuccess(response.data));
  } catch(error) {
    yield put(actions.getPostFailure(error));
  }
}

export const sagas = [
  takeLeading(types.GET_POST_REQUEST, getPost),
];

export default { reducer, sagas };
