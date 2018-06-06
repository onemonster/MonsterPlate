import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import createStore from './app/redux';
import AppNavigator from './app/navigation/ReduxNavigator';
import theme from './app/theme';

const store = createStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <View style={styles}>
            <StatusBar barStyle="default" />
            <AppNavigator />
          </View>
        </ThemeProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  flex: 1,
});
