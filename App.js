import React from 'react';
import {DefaultNavigationOptions} from 'core/utils/navigation/constants';
import {CoreNavigator} from 'core';
import {createStackNavigator} from '@react-navigation/stack';
import {useUser} from 'core/hooks';
import {ToDosNavigator} from 'to-do';
import {UserSchema} from 'core/schemas';
import {ToDoSchema} from 'to-do/schemas';
import {AuthenticationNavigator} from 'authentication';
import {SubscriptionNavigator} from 'subscription';
import {UIManager} from 'react-native';
import {RealmProvider} from 'core/providers';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const {Navigator, Screen} = createStackNavigator();

const NAVIGATION_OPTIONS = {
  ...DefaultNavigationOptions,
  headerShown: false,
};

function Routes() {
  const [user] = useUser();

  if (!user) {
    return (
      <Navigator screenOptions={NAVIGATION_OPTIONS}>
        <Screen name="Authentication" component={AuthenticationNavigator} />
        <Screen name="Subscription" component={SubscriptionNavigator} />
      </Navigator>
    );
  }

  return (
    <Navigator screenOptions={NAVIGATION_OPTIONS}>
      <Screen name="ToDos" component={ToDosNavigator} />
    </Navigator>
  );
}

export default () => (
  <RealmProvider schemas={[UserSchema, ToDoSchema]}>
    <CoreNavigator>
      <Routes />
    </CoreNavigator>
  </RealmProvider>
);
