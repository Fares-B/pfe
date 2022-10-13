import Private from "./private";
import Public from "./public";


export interface PropsRoute {
  path: string;
  element: any;
  exact?: boolean;
  layout: string;
  title: string;
  hide?: boolean;
};

export enum ROUTE_NAME {
  // public
  LOGIN = "/login",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",

  // private
  HOME = "/",
  PROFILE = "/profile",

  // other
  NOT_FOUND = "/not-found",
  // ERROR = "/error",
};

const routes: PropsRoute[] = [
  //layout public
  {
    path: ROUTE_NAME.LOGIN,
    element: Public.Login,
    title: "Connexion",
    layout: "public",
  },
  {
    path: ROUTE_NAME.FORGOT_PASSWORD,
    element: Public.Forgot,
    title: "Mot de passe oublié",
    layout: "public",
  },
  {
    path: "*",
    element: Public.Login,
    title: "Connexion",
    layout: "public",
    hide: true,
  },

  // layout private
  {
    path: ROUTE_NAME.HOME,
    element: Private.Home,
    title: "Accueil",
    layout: "private",
    // exact: true,
  },
  {
    path: "*",
    element: Private.Home,
    title: "Accueil",
    layout: "private",
    hide: true,
    // exact: true,
  },
];

export default routes;
