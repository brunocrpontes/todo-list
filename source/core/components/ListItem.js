import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import Touchable from './Touchable';

function ListItem({style, ...props}, ref) {
  const {colors} = useTheme();

  return (
    <Touchable
      style={[styles.container, {backgroundColor: colors.background}, style]}
      {...{...props, ref}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default React.forwardRef(ListItem);
