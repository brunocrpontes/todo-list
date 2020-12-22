import {useIsFocused} from '@react-navigation/native';
import {Button, Screen, Separator} from 'core/components';
import {useUser} from 'core/hooks';
import React, {useCallback, useEffect, useRef} from 'react';
import {useLayoutEffect} from 'react';
import {StyleSheet, Animated, LayoutAnimation} from 'react-native';
import {ToDoListItem} from 'to-do/components';
import {useToDos} from 'to-do/hooks';

const keyExtractor = ({id}) => String(id);

function BackButton() {
  const [, {logout}] = useUser();

  return (
    <Button style={styles.backButton} mode="text" onPress={logout}>
      Sair
    </Button>
  );
}

export default function ToDoListScreen({navigation}) {
  const [user] = useUser();
  const [todos, {toggleStatus}] = useToDos();
  const animated = useRef(new Animated.Value(0));

  const {name = ''} = user || {};

  useEffect(() => {
    navigation.setOptions({
      title: `Olá, ${name}`,
    });
  }, [name, navigation]);

  const onPressNewTodo = useCallback(() => navigation.navigate('ToDoScreen'), [
    navigation,
  ]);

  const renderItem = useCallback(
    ({item: todo}) => {
      function onPressItem() {
        navigation.navigate('ToDoScreen', todo);
      }

      function onPressStatus() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        toggleStatus(todo.id);
      }

      return <ToDoListItem {...{...todo, onPressItem, onPressStatus}} />;
    },
    [navigation, toggleStatus],
  );

  const separatorAnimatedStyle = {
    opacity: animated.current.interpolate({
      inputRange: [0, 16],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  return (
    <Screen style={styles.container}>
      <Animated.View style={separatorAnimatedStyle}>
        <Separator />
      </Animated.View>
      <Animated.FlatList
        data={todos}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.listContainer}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: animated.current,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
      />
      <Button onPress={onPressNewTodo} style={styles.newTaskButton}>
        Nova Tarefa
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 70,
  },
  backButton: {
    height: 36,
  },
  newTaskButton: {
    bottom: 16,
    elevation: 6,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowColor: 'black',
    position: 'absolute',
  },
});

ToDoListScreen.navigationOptions = {
  headerContainerStyle: {
    paddingRight: 8,
  },
  headerRight: BackButton,
  headerRightContainerStyle: {marginRight: 4},
};
