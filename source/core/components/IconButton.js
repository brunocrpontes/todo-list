import React from 'react';
import {StyleSheet} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';

function IconButton({style, ...props}, ref) {
  return (
    <BorderlessButton
      onPress={() => console.log('PRESSED')}
      style={[styles.container, style]}
      {...{...props, ref}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.forwardRef(IconButton);
