import styled from "styled-components";

export const CardStyled = styled.div`
  display: flex;

  border-radius: ${props => props.rounded || 8}px;
  border-width: ${props => props.bw || 1}px;
  border-color: ${props => props.bc || "#e6e6e6"};
  border-style: solid;

  width: ${props => props.w || "100%"};
  height: ${props => props.h || "100%"};

  padding: ${props => {
    return (props.pt || props.p || "16") + "px " +
      (props.pr || props.p || "16") + "px " +
      (props.pb || props.p || "16") + "px " +
      (props.pl || props.p || "16") + "px";
  }};

  margin: ${props => {
    return (props.mt || props.m || "0") + "px " +
      (props.mr || props.m || "0") + "px " +
      (props.mb || props.m || "0") + "px " +
      (props.ml || props.m || "0") + "px";
  }};
`;