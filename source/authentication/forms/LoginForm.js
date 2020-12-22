import React, {useCallback, useRef} from 'react';
import {useFormik} from 'formik';
import Validation from 'core/validation';
import {TextInput, Button} from 'core/components';
import {StyleSheet, View} from 'react-native';

const VALIDATION_SCHEMA = Validation.object({
  email: Validation.string().email().required(),
  password: Validation.string().required(),
});

const INITIAL_VALUES = {
  email: '',
  password: '',
};

export default function LoginForm({initialValues = {}, ...props}) {
  const {handleSubmit, getFieldProps, isValid} = useFormik({
    ...props,
    initialValues: {
      ...INITIAL_VALUES,
      ...initialValues,
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: VALIDATION_SCHEMA,
  });

  const passwordInputRef = useRef(null);

  const onSubmitEditingEmail = useCallback(() => {
    passwordInputRef.current && passwordInputRef.current.focus();
  }, []);

  const {onBlur: onBlurEmail, onChange: onChangeEmail} = getFieldProps('email');
  const {onBlur: onBlurPassword, onChange: onChangePassword} = getFieldProps(
    'password',
  );

  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          onBlur={onBlurEmail('email')}
          onChangeText={onChangeEmail('email')}
          onSubmitEditing={onSubmitEditingEmail}
        />
        <TextInput
          secureTextEntry
          placeholder="Senha"
          autoCapitalize="none"
          ref={passwordInputRef}
          onSubmitEditing={handleSubmit}
          onBlur={onBlurPassword('password')}
          onChangeText={onChangePassword('password')}
        />
      </View>
      <Button onPress={handleSubmit} disabled={!isValid} style={styles.button}>
        Entrar
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  button: {
    marginTop: 16,
  },
});
