import React from 'react';
import ContainedButton from './ContainedButton';
import TextButton from './TextButton';

function Button({mode, ...props}, ref) {
  if (mode === 'text') {
    return <TextButton {...{...props, ref}} />;
  }

  return <ContainedButton {...{...props, ref}} />;
}

export default React.forwardRef(Button);
