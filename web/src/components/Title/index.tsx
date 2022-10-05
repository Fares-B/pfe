import React from "react";
import { TitleProps } from "./type";
import TitleStyled from "./style";

const Title = ({ title, color }: TitleProps): React.ReactElement => {
  return (
    <TitleStyled color={color}>
      {title}
    </TitleStyled>
  );
}

export default Title;
