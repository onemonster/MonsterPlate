import queryString from 'query-string';
import isFunction from 'lodash/isFunction';
import fetch from '../utils/fetch';
import isGenerator from '../utils/isGenerator';

const createAPI = (customURL, headers, checkPermission) => {
  const baseURL = customURL || process.env.API_HOST;
  const httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  headers = headers || { 'Content-Type': 'application/json' };

  const api = {};

  httpMethods.forEach((method) => {
    api[method.toLowerCase()] = function* (endpoint, body, options) {
      let isRestricted = false;
      if (isGenerator(checkPermission)) {
        isRestricted = !(yield checkPermission());
      } else if (isFunction(checkPermission)) {
        isRestricted = !(checkPermission());
      }
      if (isRestricted) {
        const error = new Error('Client Error. Missing request permissions');
        error.errors = [
          {
            title: 'Client Error',
            detail: 'Missing permission to send request',
            source: {},
          },
        ];
        throw error;
      }
      let url = `${baseURL}${endpoint}`;
      if (method === 'GET' && body) {
        url = `${url}?${queryString.stringify(body)}`;
      }
      try {
        const response = yield fetch(url, { method, body: method === 'GET' ? null : JSON.stringify(body), headers, ...options });
        return response;
      } catch (error) {
        throw error;
      }
    };
  });

  return api;
};

export const request = createAPI('https://jsonplaceholder.typicode.com');

export const exampleRequest = createAPI('https://jsonplaceholder.typicode.com');

export default createAPI;
