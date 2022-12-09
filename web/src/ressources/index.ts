import UsersList from "./users/list";
import UserShow from "./users/show";
import UsersEdit from "./users/edit";
// import UsersCreate from "./users/create";

import ProductsList from "./products/list";
import ProductsShow from "./products/show";
import ProductsEdit from "./products/edit";
import ProductsCreate from "./products/create";

import ReportsList from "./reports/list";
import ReportsShow from "./reports/show";


export const Users = {
  list: UsersList,
  show: UserShow,
  edit: UsersEdit,
  // create: UsersCreate,
};

export const Products = {
  list: ProductsList,
  show: ProductsShow,
  edit: ProductsEdit,
  create: ProductsCreate,
};

export const Reports = {
  list: ReportsList,
  show: ReportsShow,
};
