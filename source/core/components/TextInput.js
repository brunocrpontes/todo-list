import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TextInput as NativeTextInput} from 'react-native';

function TextInput({style, ...props}, forwardedRef) {
  const {colors} = useTheme();

  return (
    <NativeTextInput
      ref={forwardedRef}
      underlineColorAndroid="transparent"
      style={[styles.container, {color: colors.text}, style]}
      placeholderTextColor={colors.placeholder}
      selectionColor={colors.placeholder}
      {...props}
    />
  );
}

export default React.forwardRef(TextInput);

const styles = StyleSheet.create({
  container: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 8,
    paddingBottom: 16,
  },
});
