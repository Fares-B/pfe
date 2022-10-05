import React, { useEffect } from "react";
import HStack from "../../../components/HStack";
import Title from "../../../components/Title";
import VStack from "../../../components/VStack";

interface Props {
  token: string;
}

export default function History({ token }: Props): React.ReactElement {

  useEffect(() => {
    console.log("token", token);
  }, []);

  return (
    <VStack>
      <HStack w="100%" justifyContent="space-between" alignItems="center" >
        <Title title="Accueil" />
      </HStack>
      <p>Page en cours de construction...</p>
    </VStack>
  );
}
