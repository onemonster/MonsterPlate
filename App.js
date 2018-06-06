import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux'
import createStore from './app/redux';
import AppNavigator from './app/navigation/ReduxNavigator';

const store = createStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles}>
          <StatusBar barStyle="default" />
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  flex: 1,
});
