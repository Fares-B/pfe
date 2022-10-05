import styled from 'styled-components';

const VStackStyled = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.flex ? "flex-grow: " + props.flex + ";" : ""}

  ${props => props.h ? "height: " + props.h + ";" : ""}
  ${props => props.w ? "width: " + props.w + ";" : ""}

  justify-content: ${props => props.justifyContent || "flex-start"};
  align-items: ${props => props.alignItems || "flex-start"};
  gap: ${props => props.space || "2"}px;

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

export default VStackStyled;
