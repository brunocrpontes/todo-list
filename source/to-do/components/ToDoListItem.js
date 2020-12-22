import {useTheme} from '@react-navigation/native';
import {IconButton, ListItem, Text} from 'core/components';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, Easing, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const {width: screenWidth} = Dimensions.get('screen');

export default function ToDoListItem({
  title,
  description,
  done = false,
  onPressStatus,
  onPressItem,
}) {
  const {colors} = useTheme();

  const [titleWidth, setTitleWidth] = useState(screenWidth);
  const iconButtonRef = useRef(null);
  const animated = useRef(new Animated.Value(Number(!!done)));

  const onLayoutTitleWidth = useCallback(
    (event) => {
      const {width} = event?.nativeEvent?.layout;

      setTitleWidth(width);
    },
    [setTitleWidth],
  );

  useEffect(() => {
    Animated.timing(animated.current, {
      toValue: Number(!!done),
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [done]);

  const right = animated.current.interpolate({
    inputRange: [0, 1],
    outputRange: [titleWidth, 0],
    extrapolate: 'clamp',
  });

  const overlineAnimatedStyle = {
    right,
  };

  return (
    <ListItem
      waitFor={iconButtonRef}
      onPress={onPressItem}
      style={styles.container}>
      <IconButton ref={iconButtonRef} onPress={onPressStatus}>
        <LottieView
          colorFilters={[
            {keypath: 'check-circle Outlines', color: colors.text},
          ]}
          autoSize
          style={styles.status}
          source={require('to-do/assets/animations/radio-button.json')}
          progress={animated.current}
        />
      </IconButton>
      <View style={styles.contentContainer}>
        <View onLayout={onLayoutTitleWidth} style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Animated.View
            style={[
              styles.doneOverline,
              overlineAnimatedStyle,
              {backgroundColor: colors.text, borderColor: colors.background},
            ]}
          />
        </View>
        {description && (
          <Text
            numberOfLines={2}
            style={[styles.description, {color: colors.placeholder}]}>
            {description}
          </Text>
        )}
      </View>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    marginHorizontal: 16,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  doneOverline: {
    height: 3,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
  },
  status: {
    height: 28,
    width: 28,
    alignItems: 'center',
  },
});
