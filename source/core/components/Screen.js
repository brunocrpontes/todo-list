import {useKeyboard} from '@react-native-community/hooks';
import {useHeaderHeight} from '@react-navigation/stack';
import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const KEYBOARD_AVOIDING_VIEW_BEHAVIOR = Platform.select({
  ios: 'padding',
  default: 'height',
});

export default function Screen({
  headerTransparent,
  as: Element = SafeAreaView,
  keyboardAvoidingViewHandling = true,
  ...props
}) {
  const {keyboardShown} = useKeyboard();
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR}
      enabled={keyboardShown && keyboardAvoidingViewHandling}
      keyboardVerticalOffset={headerTransparent ? 0 : headerHeight}>
      <Element {...props} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
