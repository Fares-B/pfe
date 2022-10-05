import React from "react";
import { CardProps } from "./type";
import { CardStyled } from "./style";

const Card = (props: CardProps): React.ReactElement => {
  return (
    <CardStyled {...props} >
      {props.children}
    </CardStyled>
  );
}

export default Card;
