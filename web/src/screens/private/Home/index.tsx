import React, { useEffect } from "react";
import { Admin, Resource, ListGuesser, fetchUtils, ListActions, ListButton, EditActions } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const API_END_POINT = process.env.REACT_APP_BACKEND_BASE_URL||'http://localhost:3000';

function dataProvider () {
  const httpClient = (url:string, options:any = {}) => {
    const token = localStorage.getItem('token');
    options.user = {
      authenticated: token && true,
      // use the token from local storage
      token,
    };
    return fetchUtils.fetchJson(url, options);
  };

  return simpleRestProvider(API_END_POINT, httpClient);
}


const App: React.FC<{token:string}> = ({ token }) => {
  return (
    <Admin dataProvider={dataProvider()}>
      {/* <Resource name="products" list={ListGuesser} edit={EditActions} /> */}
      <Resource name="users" list={ListGuesser} />
    </Admin>
  );
};

export default App;
