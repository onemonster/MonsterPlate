import React from 'react';
import { connect } from 'react-redux';
import { initializeListeners } from 'react-navigation-redux-helpers';
import AppNavigator from './AppNavigator';
import { navigationPropConstructor } from './reduxMiddleware';

class ReduxNavigator extends React.Component {
  componentDidMount() {
    initializeListeners('root', this.props.nav);
  }

  render() {
    const navigation = navigationPropConstructor(
      this.props.dispatch,
      this.props.nav
    );
    return <AppNavigator navigation={navigation} />
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(ReduxNavigator);
