import React, {useMemo} from 'react';
import Color from 'color';
import {useTheme} from '@react-navigation/native';
import BaseButton from './BaseButton';

const DISABLED_COLOR_RATIO = 0.75;

function ContainedButton(
  {disabled, style, labelStyle, underlayColor, ...props},
  ref,
) {
  const {colors} = useTheme();

  const themedStyles = useMemo(() => {
    if (disabled) {
      return {
        label: {
          color: Color(colors.disabled).darken(DISABLED_COLOR_RATIO).hex(),
        },
        container: {
          backgroundColor: Color(colors.disabled).hex(),
        },
      };
    }

    return {
      label: {
        color: colors.background,
      },
      container: {
        backgroundColor: colors.primary,
      },
    };
  }, [colors, disabled]);

  return (
    <BaseButton
      underlayColor={colors.background}
      style={[themedStyles.container, style]}
      labelStyle={[themedStyles.label, labelStyle]}
      {...{...props, disabled, ref}}
    />
  );
}

export default React.forwardRef(ContainedButton);
