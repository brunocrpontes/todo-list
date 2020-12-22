import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DefaultNavigationOptions} from 'core/utils/navigation/constants';
import {ToDoListScreen, ToDoScreen} from 'to-do/screens';
import {ToDosProvider} from './providers';

const TODOS = [];

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <ToDosProvider initialToDos={TODOS}>
      <Stack.Navigator screenOptions={DefaultNavigationOptions}>
        <Stack.Screen
          name="ToDoListScreen"
          component={ToDoListScreen}
          options={ToDoListScreen.navigationOptions}
        />
        <Stack.Screen
          name="ToDoScreen"
          component={ToDoScreen}
          options={ToDoScreen.navigationOptions}
        />
      </Stack.Navigator>
    </ToDosProvider>
  );
}
