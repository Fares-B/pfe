import styled from 'styled-components';

const TitleStyled = styled.button`
  font-size: 1.5em;
  text-align: center;
  background-color: white;
  border: 2px solid ${props => props.color || "palevioletred"};
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.color || "palevioletred"};
`;

export default TitleStyled;
