import React from "react";
import { ButtonProps } from "./type";
import ButtonStyled from "./style";

const Button = ({ label, color, onClick }: ButtonProps): React.ReactElement => {
  return (
    <ButtonStyled color={color} onClick={onClick} >
      {label}
    </ButtonStyled>
  );
}

export default Button;
