import Immutable from 'seamless-immutable';
import { all, put } from 'redux-saga/effects'
import { takeLeading } from '../../../utils/sagaEffects'
import { createActions, createReducer } from '../../../services/reduxer';
import { exampleRequest } from '../../../services/api';

// Redux Logic

export const { actions, types } = createActions('PostListScreen', {
  getPosts: {
    request: null,
    success: ['posts'],
    failure: ['error'],
  },
});

const initialState = Immutable({
  posts: [],
  isFetching: false,
  error: null,
});

export const reducer = createReducer(initialState, {
  [types.GET_POSTS_REQUEST]: (state) => state.merge({ isFetching: true, error: null }),
  [types.GET_POSTS_SUCCESS]: (state, { posts }) => state.merge({ posts, isFetching: false, error: null }),
  [types.GET_POSTS_FAILURE]: (state, { error }) => state.merge({ isFetching: false, error }),
});

// Saga Logic

function * getPosts() {
  try {
    const response = yield exampleRequest.get(`/posts`);
    yield put(actions.getPostsSuccess(response.data));
  } catch(error) {
    yield put(actions.getPostsFailure(error));
  }
}

export const sagas = [
  takeLeading(types.GET_POSTS_REQUEST, getPosts),
];
