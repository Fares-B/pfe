import styled from 'styled-components';

const GridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || "1"}, 1fr);  
  grid-auto-rows: minmax(100px, ${props => props.rh || 350}px);
  grid-gap: ${props => props.space || "2"}px;

  ${props => props.flex ? "flex-grow: " + props.flex + ";" : ""}

  ${props => props.h ? "height: " + props.h + ";" : ""}
  ${props => props.w ? "width: " + props.w + ";" : ""}

  justify-content: ${props => props.justifyContent || "flex-start"};
  align-items: ${props => props.alignItems || "flex-start"};

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

export default GridStyled;
