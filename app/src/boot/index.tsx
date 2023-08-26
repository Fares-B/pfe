import { Suspense, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@mui/private-theming';
import { Provider } from 'react-redux';
import { routes } from '../pages/routes';
import AppBar from '../components/AppBar';
import Login from '../components/Modal/Login';
import Register from '../components/Modal/Register';
import Forgot from '../components/Modal/Forgot';
import store from '../store/index';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale("fr");

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
  const [authModal, setAuthModal] = useState<null|"login"|"register"|"forgot">(null);

  

  const onCloseAuthModal = () => setAuthModal(null);

  return (
    // <AppProvider>

    <Provider store={store}>

      <ThemeProvider theme={theme}>
        <CssBaseline />


        <BrowserRouter basename="/">
          {/* NAV */}
          <AppBar openLoginModal={() => setAuthModal("login")} />

          <Login
            open={authModal === "login"}
            onClose={onCloseAuthModal}
            onOpenRegisterModal={() => setAuthModal("register")}
            onOpenForgotModal={() => setAuthModal("forgot")}
          />
          <Register
            open={authModal === "register"}
            onClose={onCloseAuthModal}
            onOpenLoginModal={() => setAuthModal("login")}
          />
          <Forgot
            open={authModal === "forgot"}
            onClose={onCloseAuthModal}
            onOpenLoginModal={() => setAuthModal("login")}
          />

          {/* MAIN */}
          <Container style={{ backgroundColor: "#e9eaed" }}>
            <Suspense fallback={<div>Chargement...</div>}>
              <Routes>
                {routes.map((route, i) => (
                  <Route
                    key={i}
                    path={route.path}
                    element={<route.component openLoginModal={() => setAuthModal("login")} />}
                  />
                ))}
              </Routes>
            </Suspense>
          </Container>
        </BrowserRouter>

      </ThemeProvider>
    </Provider>
  );
}
