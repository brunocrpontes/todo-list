import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import theme from 'core/theme';
import {UserProvider} from 'core/providers';

enableScreens();

export default function Navigator({children, ...props}) {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <NavigationContainer theme={theme[colorScheme || 'light']} {...props}>
        {children}
      </NavigationContainer>
    </UserProvider>
  );
}
