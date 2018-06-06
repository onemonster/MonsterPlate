import { camel, capital, constant,  pascal } from 'case';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import keys from 'lodash/keys';
import zipObject from 'lodash/zipObject';
import isNil from 'lodash/isNil';
import has from 'lodash/has';

const getActions = (root, config, app='') =>
  keys(config).reduce((acc, cur) =>
    isPlainObject(config[cur]) ?
      { ...acc, ...getActions(root, config[cur], cur) }:
      { ...acc, [`${camel(`${app}${pascal(cur)}`)}`]: (...values) => ({ type:`${root}/${constant(`${app}${capital(cur)}`)}` , ...zipObject(config[cur], values) }) }, {});

export const createActions = (root, config) => {
  const actions = getActions(root, config);
  const types = keys(actions).reduce((acc, cur) => ({...acc, [`${constant(cur)}`]: `${root}/${constant(cur)}`}), {});
  return { actions, types };
};

export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (isNil(action)) {
      return state;
    }
    if (!has(action, 'type')) {
      return state;
    }
    const handler = handlers[action.type];
    if (!isFunction(handler)) {
      return state;
    }
    return handler(state, action)
  };
};
