import React, {useCallback} from 'react';
import {Screen} from 'core/components';
import {StyleSheet} from 'react-native';
import {SubscriptionForm} from 'subscription/forms';
import {useUser} from 'core/hooks';
import {v4 as UUID_V4} from 'uuid';

export default function SubscriptionScreen({navigation}) {
  const [, {login}] = useUser();

  const onSubmitSubscription = useCallback(
    (user) => {
      const {name, email} = user;
      const newUser = {
        name,
        email,
        id: UUID_V4(),
      };

      login(newUser);
    },
    [login],
  );

  return (
    <Screen style={styles.container}>
      <SubscriptionForm onSubmit={onSubmitSubscription} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'space-between',
  },
});

SubscriptionScreen.navigationOptions = {
  title: 'Cadastro',
};
