import { Suspense } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@mui/private-theming';
import { routes } from '../pages/routes';
import AppBar from '../components/AppBar';
import { AppProvider } from '../context';


let theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#fff',
    },
  },
  components: {},
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         textTransform: 'none',
  //       },
  //     },
  //   },
  // },
});
theme = responsiveFontSizes(theme);

export default function Boot() {
  return (
    <AppProvider>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter basename="/">
          {/* NAV */}
          <AppBar />

          {/* MAIN */}
          <Container>
            <Suspense fallback={<div>Chargement...</div>}>
              <Routes>
                {routes.map((route, i) => (
                  <Route
                    key={i}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Routes>
            </Suspense>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  );
}