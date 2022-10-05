import React from "react";
import { CenterProps } from "./type";
import CenterStyled from "./style";

const Center = ({ children, ...rest }: CenterProps): React.ReactElement => {
  return (
    <CenterStyled {...rest}>
      {children}
    </CenterStyled>
  );
}

export default Center;
