import { ShowButtonProps } from "react-admin";
import styled from "styled-components";
import colors from "../assets/colors";

// List

interface IActionReason {
  danger?: boolean;
}

// Show
export const ActionReason = styled.div<IActionReason>`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0.5rem 0;
  gap: 0.5rem;


  color: ${colors.blue};
`;

export const ActionReasonItem = styled.span<IActionReason>`
  color: ${props => props.danger ? colors.red : colors.blue};
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 500;
  font-size: 0.8125rem;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  cursor: pointer;

  background-color: transpatent;
  min-width: 64px;
  padding: 4px 5px;
  border-radius: 4px;
  
  -webkit-transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    color: ${props => props.danger ? colors.redHover : colors.blueHover};
    background-color: ${props => props.danger ? colors.redBackgroundHover : colors.blueBackgroundHover};
  }
`;

export const ActionShow = styled(ActionReasonItem)<ShowButtonProps>``;



export const ListReason = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;
  
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CardReason = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 1em;
  margin: 1em;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`;