import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Text as NativeText} from 'react-native';
import color from 'color';

export default function Text({style, ...props}) {
  const {colors} = useTheme();

  return (
    <NativeText
      selectionColor={color(colors.text).lighten(0.3).alpha(0.5).hex()}
      style={[{color: colors.text}, style]}
      {...props}
    />
  );
}
