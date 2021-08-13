import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';

const Stack = createStackNavigator();

const headerOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#006aff'
  }
};

function AppContent() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ 
            ...headerOptions,
            title: 'Home'
          }}
        />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{
            ...headerOptions,
            title: 'Employee'
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            ...headerOptions,
            title: 'Profile',
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
    marginTop: Constants.statusBarHeight,
  },
});
