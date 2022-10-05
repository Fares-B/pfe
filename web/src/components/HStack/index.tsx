import React from "react";
import { HStackProps } from "./type";
import HStackStyled from "./style";

const HStack = ({ justifyContent, alignItems, space, children, ...rest }: HStackProps): React.ReactElement => {
  return (
    <HStackStyled justifyContent={justifyContent} alignItems={alignItems} space={space} {...rest}>
      {children}
    </HStackStyled>
  );
}

export default HStack;
