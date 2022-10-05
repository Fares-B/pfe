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

const routes: PropsRoute[] = [
  //layout public
  {
    path: "/",
    element: Public.Login,
    title: "Connexion",
    layout: "public",
  },
  {
    path: "/signup",
    element: Public.Signup,
    title: "Inscription",
    layout: "public",
  },
  {
    path: "/forgot",
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
    path: "/",
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
