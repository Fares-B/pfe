import { AuthProvider, LegacyAuthProvider } from "react-admin";
import { loginRequest } from "../globals/fetch";
import { LoginProps } from "../globals/type";

const authProvider: AuthProvider | LegacyAuthProvider | undefined = {
  login: (params: any) => {
    return loginRequest({
      phone: params.username,
      password: params.password,
    })
      .then(({ token = null }) => {
        if (token) {
          localStorage.setItem("token", token);
          return Promise.resolve();
        };
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve(/* { message: false } */);
  },
  checkAuth: () => localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
  checkError: (error: any) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      // localStorage.removeItem('token');
      return Promise.reject({ redirectTo: '/unauthorized', logoutUser: false });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  // getIdentity: () =>
  //   Promise.resolve({
  //     id: localStorage.getItem('token'),
  //   }),
  getPermissions: () => Promise.resolve(''),
};

export default authProvider;