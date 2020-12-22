import React from 'react';
import {Button, Text, Screen} from 'core/components';
import {StyleSheet} from 'react-native';
import {useKeyboard} from '@react-native-community/hooks';
import {useCallback} from 'react';
import {LoginForm} from 'authentication/forms';
import {useUser} from 'core/hooks';
import {v4 as UUID_V4} from 'uuid';

export default function LoginScreen({navigation}) {
  const [, {login}] = useUser();
  const {keyboardShown} = useKeyboard();

  const onPressSubscription = useCallback(() => {
    navigation.navigate('Subscription');
  }, [navigation]);

  const onSubmitLogin = useCallback(
    (credentials) => {
      const {email} = credentials;

      const user = {
        id: UUID_V4(),
        email,
        name: 'Bruno Cardoso',
      };

      login(user);
    },
    [login],
  );

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <LoginForm onSubmit={onSubmitLogin} />
      {!keyboardShown && (
        <Button
          onPress={onPressSubscription}
          style={styles.subscriptionButton}
          mode="text">
          Cadastre-se
        </Button>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  subscriptionButton: {
    alignSelf: 'center',
    marginVertical: 16,
  },
});

LoginScreen.navigationOptions = {
  headerShown: false,
};
