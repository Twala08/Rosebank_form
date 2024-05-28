import React from 'react';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




const customTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            borderColor: 'green',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'green',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'green',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'green',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#93AB4F',
          '&.Mui-checked': {
            color: '#93AB4F',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#93AB4F',
          '&.Mui-checked': {
            color: '#93AB4F',
          },
        },
      },
    },
  },
});

const AppBar = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <MuiAppBar position="fixed">
        <Toolbar
          sx={{
            pr: '24px', // Keep right padding when drawer closed
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="#D81730" 
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Rosebank College
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </ThemeProvider>
  );
};

export default AppBar;