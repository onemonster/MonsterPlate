import AppNavigator from '../navigation/AppNavigator';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

export const reducer = createNavigationReducer(AppNavigator);

export default { reducer };
