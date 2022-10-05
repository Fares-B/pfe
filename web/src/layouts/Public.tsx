import React from "react";
import routes from "../screens/routes";
import { Routes, Route } from "react-router-dom";

interface Props {
  ok?: boolean;
}

export default function Public(props: Props): React.ReactElement {

  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.layout !== "public") return null;
        const Screen = route.element;
        return (
          <Route
            key={index}
            path={route.path}
            element={<Screen />}
          />
        );
      })}
    </Routes>
  );
}