import styled from 'styled-components';

const CenterStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.w ? "width: " + props.w + ";" : ""}
  ${props => props.w ? "height: " + props.h + ";" : ""}

  padding: ${props => {
    return (props.pt || props.p || "0") + "px " +
      (props.pr || props.p || "0") + "px " +
      (props.pb || props.p || "0") + "px " +
      (props.pl || props.p || "0") + "px";
  }};

  margin: ${props => {
    return (props.mt || props.m || "0") + "px " +
      (props.mr || props.m || "0") + "px " +
      (props.mb || props.m || "0") + "px " +
      (props.ml || props.m || "0") + "px";
  }};
`;

export default CenterStyled;
