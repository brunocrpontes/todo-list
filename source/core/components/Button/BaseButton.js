import React from 'react';
import Text from '../Text';
import {StyleSheet} from 'react-native';
import Touchable from '../Touchable';

function BaseButton({style, children, labelStyle, ...props}, ref) {
  return (
    <Touchable style={[styles.container, style]} {...{...props, ref}}>
      <Text style={[styles.label, labelStyle]}>{children}</Text>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    overflow: 'hidden',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default React.forwardRef(BaseButton);
