import {useFormik} from 'formik';
import React from 'react';
import Validation from 'core/validation';
import {Button, TextInput} from 'core/components';
import {View} from 'react-native';

const VALIDATION_SCHEMA = Validation.object({
  name: Validation.string().required(),
  email: Validation.string().email().required(),
  password: Validation.string().min(6).required(),
});

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
};

export default function SubscriptionForm({initialValues, ...props}) {
  const {handleSubmit, isValid, getFieldProps} = useFormik({
    ...props,
    initialValues: {
      ...INITIAL_VALUES,
      ...initialValues,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: VALIDATION_SCHEMA,
  });

  const {onBlur: onBlurName, onChange: onNameTextChange} = getFieldProps(
    'name',
  );
  const {onBlur: onBlurEmail, onChange: onEmailTextChange} = getFieldProps(
    'email',
  );
  const {
    onBlur: onBlurPassword,
    onChange: onPasswordTextChange,
  } = getFieldProps('password');

  return (
    <>
      <View>
        <TextInput
          autoFocus
          autoCapitalize="words"
          onBlur={onBlurName('name')}
          onChangeText={onNameTextChange('name')}
          placeholder="Nome"
        />
        <TextInput
          autoCapitalize="none"
          onBlur={onBlurEmail('email')}
          onChangeText={onEmailTextChange('email')}
          placeholder="E-mail"
        />
        <TextInput
          onBlur={onBlurPassword('password')}
          onChangeText={onPasswordTextChange('password')}
          placeholder="Senha"
          secureTextEntry
        />
      </View>
      <Button disabled={!isValid} onPress={handleSubmit}>
        Cadastrar
      </Button>
    </>
  );
}
