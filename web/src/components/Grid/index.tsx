import React from "react";
import { GridProps } from "./type";
import GridStyled from "./style";

const Grid = ({ justifyContent, alignItems, space, children, ...rest }: GridProps): React.ReactElement => {
  return (
    <GridStyled justifyContent={justifyContent} alignItems={alignItems} space={space} {...rest}>
      {children}
    </GridStyled>
  );
}

export default Grid;
