import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PostDetailScreen from '../screens/example/PostDetailScreen';

// Manifest of possible screens
// const Navigator = createStackNavigator({});

// export default Navigator;

// Example screens navigator
const ExampleNavigator = createStackNavigator({
  detail: { screen: PostDetailScreen },
});

export default ExampleNavigator;
