import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function Separator({children, style, ...props}) {
  const {colors} = useTheme();

  if (children) {
    throw new Error("Separator component should't have any children");
  }

  return (
    <View
      style={[styles.container, {backgroundColor: colors.disabled}, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 1,
  },
});
