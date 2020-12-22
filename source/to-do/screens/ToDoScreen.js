import {HeaderBackButton} from '@react-navigation/stack';
import {Button, Icon, IconButton, Screen, TextInput} from 'core/components';
import {useFormik} from 'formik';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import Validation from 'core/validation';
import {useToDos} from 'to-do/hooks';
import {useTheme} from '@react-navigation/native';

const VALIDATION_SCHEMA = Validation.object({
  id: Validation.string(),
  title: Validation.string().required(),
  description: Validation.string(),
});

export default function ToDoScreen({navigation, route}) {
  const {title = '', description = '', id} = route.params || {};

  const [, {save, delete: deleteToDo}] = useToDos();
  const {colors} = useTheme();

  const onSubmit = useCallback(
    (todo) => {
      save(todo);

      navigation.goBack();
    },
    [navigation, save],
  );

  const onDelete = useCallback(() => {
    navigation.goBack();

    deleteToDo(id);
  }, [deleteToDo, navigation, id]);

  const {handleSubmit, isValid, getFieldProps} = useFormik({
    validateOnMount: true,
    onSubmit,
    validationSchema: VALIDATION_SCHEMA,
    initialValues: {
      id,
      title,
      description,
    },
  });

  const {
    value: defaultTitleValue,
    onBlur: onBlurTitle,
    onChange: onChangeTitleText,
  } = getFieldProps('title');
  const {
    value: defaultDescriptionValue,
    onBlur: onBlurDescription,
    onChange: onChangeDescriptionText,
  } = getFieldProps('description');

  return (
    <Screen headerTransparent style={[styles.container]}>
      <View style={[styles.headerContainer]}>
        <HeaderBackButton onPress={navigation.goBack} labelVisible={false} />
        <TextInput
          placeholder="Título"
          style={styles.titleInput}
          onBlur={onBlurTitle('title')}
          autoFocus={!defaultTitleValue}
          defaultValue={defaultTitleValue}
          onChangeText={onChangeTitleText('title')}
        />
      </View>
      <View flex={1} padding={16}>
        <TextInput
          multiline
          placeholder="Descrição"
          textAlignVertical="top"
          style={styles.descriptionInput}
          onBlur={onBlurDescription('description')}
          onChangeText={onChangeDescriptionText('description')}
          defaultValue={defaultDescriptionValue}
        />
        <View flexDirection="row">
          {!!id && (
            <IconButton onPress={onDelete} style={styles.deleteButton}>
              <Icon name="trash" size={24} color={colors.text} />
            </IconButton>
          )}
          <Button
            style={styles.saveButton}
            disabled={!isValid}
            onPress={handleSubmit}>
            Salvar
          </Button>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
  },
  titleInput: {
    flex: 1,
    paddingVertical: 8,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  descriptionInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'normal',
  },
  backButton: {
    marginRight: 32,
  },
  saveButton: {
    flex: 1,
  },
  deleteButton: {
    marginRight: 16,
  },
});

ToDoScreen.navigationOptions = {
  headerShown: false,
};
