import React from "react";
import C from "../../../components";
import { ROUTE_NAME } from "../../routes";

export default function Signup(props: any): React.ReactElement {
  return (
    <div>
      <C.Title title="INSCRIPTION" />

      <C.Button label="CONNEXION" onClick={() => props.navigation.navigate(ROUTE_NAME.LOGIN)} />
    </div>
  );
}
