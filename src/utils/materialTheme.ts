import { outlinedInputClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#fff'
    }
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '--TextField-brandBorderColor': '#E0E3E7',
          '--TextField-brandBorderHoverColor': '#B2BAC2',
          '--TextField-brandBorderFocusedColor': '#fff',
          '& label': {
            color: 'var(--TextField-brandBorderColor)',
          },
          '& label.Mui-focused': {
            color: 'var(--TextField-brandBorderFocusedColor)',
          },
          'input': {
            color: 'var(--TextField-brandBorderFocusedColor)',
          }
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--TextField-brandBorderColor)',
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderHoverColor)',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    }
  }
});
