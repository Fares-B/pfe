import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Category = lazy(() => import("./Category"));
const Product = lazy(() => import("./Product"));
const Profile = lazy(() => import("./Profile"));

export interface RouteInterface {
  path: string;
  name: string;
  component: any;
  hidden?: boolean;
}

export const routes: RouteInterface[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/deal/:id",
    name: "product",
    component: Product,
  },
  {
    path: "/bons-plans/:name",
    name: "productName",
    component: Product,
  },
  {
    path: "/codes-promo/:name",
    name: "product",
    component: Category,
  },
  {
    path: "/profile/:name",
    name: "profile",
    component: Profile,
  },
  // {
  //   path: "/profile/:name",
  //   name: "profile",
  //   component: Profile,
  // },
  {
    path: "*",
    name: "other",
    component: Home,
    hidden: true,
  },
];

export default routes;
