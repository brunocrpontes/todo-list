const DEFAULT_COLORS = {
  error: '#DB6B6B',
  disabled: '#ccc',
};

export default {
  light: {
    colors: {
      primary: '#444444',
      background: '#FFFFFF',
      text: '#444444',
      placeholder: '#999',
      ...DEFAULT_COLORS,
    },
    dark: false,
  },
  dark: {
    colors: {
      primary: '#FFFFFF',
      background: '#222',
      text: '#FFFFFF',
      placeholder: '#999',
      ...DEFAULT_COLORS,
    },
    dark: true,
  },
};
