import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PopularMoviesScreen from './src/screens/PopularMoviesScreen';
import MovieSearchScreen from './src/screens/MovieSearchScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Popular Movies" component={PopularMoviesScreen} />
        <Stack.Screen name="Search" component={MovieSearchScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;