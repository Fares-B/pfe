import React from "react";
import { VStackProps } from "./type";
import VStackStyled from "./style";

const VStack = ({ justifyContent, alignItems, space, children, ...rest }: VStackProps): React.ReactElement => {
  return (
    <VStackStyled justifyContent={justifyContent} alignItems={alignItems} space={space} {...rest}>
      {children}
    </VStackStyled>
  );
}

export default VStack;
