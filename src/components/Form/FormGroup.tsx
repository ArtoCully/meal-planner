
import styled from 'styled-components';
import {
  Pane,
  majorScale
} from 'evergreen-ui';

const FormGroup = styled(Pane)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: ${majorScale(2)}px;
  width: 100%;
`;

export default FormGroup;
