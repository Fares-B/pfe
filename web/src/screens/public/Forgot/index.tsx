import React from "react";
import C from "../../../components";
import { ROUTE_NAME } from "../../routes";

export default function Forgot(props: any): React.ReactElement {
  return (
    <div>
      <C.Title title="MOT DE PASSE OUBLIÉ" />

      <C.Button label="CONNEXION" onClick={() => props.navigation.navigate(ROUTE_NAME.LOGIN)} />
    </div>
  );
}
