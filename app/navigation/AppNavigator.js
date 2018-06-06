import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PostListScreen from '../screens/example/PostListScreen';
import PostDetailScreen from '../screens/example/PostDetailScreen';

// Manifest of possible screens
// const Navigator = createStackNavigator({});

// export default Navigator;

// Example screens navigator
const ExampleNavigator = createStackNavigator(
  {
    PostListScreen: { screen: PostListScreen },
    PostDetailScreen: { screen: PostDetailScreen },
  },
  {
    initialRouteName: 'PostListScreen',
  }
);

export default ExampleNavigator;
