import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LoginScreen} from 'authentication/screens';
import {DefaultNavigationOptions} from 'core/utils/navigation/constants';

const Stack = createStackNavigator();

export default function Navigator({navigation, route}) {
  return (
    <Stack.Navigator screenOptions={{DefaultNavigationOptions}}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={LoginScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
}
