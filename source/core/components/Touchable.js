import React from 'react';
import color from 'color';
import {useTheme} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';

function Touchable({disabled = false, underlayColor, onPress, ...props}, ref) {
  const {colors} = useTheme();

  return (
    <RectButton
      underlayColor={color(underlayColor || colors.primary)
        .alpha(0.36)
        .hex()}
      onPress={onPress}
      enabled={!disabled}
      {...{...props, ref}}
    />
  );
}

export default React.forwardRef(Touchable);
