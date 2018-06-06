import {
  createReactNavigationReduxMiddleware,
  createNavigationPropConstructor,
} from 'react-navigation-redux-helpers';

export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.nav
);

export const navigationPropConstructor = createNavigationPropConstructor('root');
