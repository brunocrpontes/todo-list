import React, {useMemo} from 'react';
import Color from 'color';
import {useTheme} from '@react-navigation/native';
import BaseButton from './BaseButton';

const DISABLED_COLOR_RATIO_DARK = -0.75;
const DISABLED_COLOR_RATIO_LIGHT = 1;

function TextButton({disabled, labelStyle, ...props}, ref) {
  const {colors, dark} = useTheme();

  const themedStyles = useMemo(() => {
    if (disabled) {
      const DISABLED_COLOR_RATIO = dark
        ? DISABLED_COLOR_RATIO_DARK
        : DISABLED_COLOR_RATIO_LIGHT;

      return {
        label: {
          color: Color(colors.primary).lighten(DISABLED_COLOR_RATIO).hex(),
        },
      };
    }

    return {
      label: {
        color: colors.primary,
      },
    };
  }, [colors, dark, disabled]);

  return (
    <BaseButton
      underlayColor={colors.primary}
      labelStyle={[themedStyles.label, labelStyle]}
      {...{disabled, ref, ...props}}
    />
  );
}

export default React.forwardRef(TextButton);
