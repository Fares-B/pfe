import React from "react";
import { Button, Title } from "../../../components";
import { ROUTE_NAME } from "../../routes";

export default function Signup(props: any): React.ReactElement {
  return (
    <div>
      <Title title="INSCRIPTION" />

      <Button label="CONNEXION" onClick={() => props.navigation.navigate(ROUTE_NAME.LOGIN)} />
    </div>
  );
}
