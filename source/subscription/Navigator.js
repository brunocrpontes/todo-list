import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DefaultNavigationOptions} from 'core/utils/navigation/constants';
import {SubscriptionScreen} from './screens';

const Stack = createStackNavigator();

export default function Navigator({navigation, route}) {
  return (
    <Stack.Navigator screenOptions={DefaultNavigationOptions}>
      <Stack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={SubscriptionScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
}
