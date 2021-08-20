import React from 'react';
import { Pane, Heading } from 'evergreen-ui';
import styled from 'styled-components';

interface IDividerWithText {
  text?: string;
  lineColour?: string;
  textColour?: string;
}

const Line = styled(Pane)`
  flex: 1;
  height: 3px;
  width: 20px;
  background-color: ${props => props.background ? props.background : 'var(--global-colour-black)'};
`;

const Title = styled(Heading)`
  padding: 0 2rem;
  color: ${props => props.color ? props.color : 'var(--global-colour-black)'};
`;

export default function DividerWithText({ text, lineColour, textColour }: IDividerWithText) {
  return (
    <Pane
      display="flex"
      alignItems="center"
      margin="20px"
    >
      <Line background={lineColour}></Line>
      <Title is="h2" color={textColour}>{text}</Title>
      <Line background={lineColour}></Line>
    </Pane>
  )
}
