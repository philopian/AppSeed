import styled from "styled-components";
import { lighten, darken } from "polished";
import colors from "../../constants/colors";

// Overriding styles
export const Wrapper = styled.div`
  margin: 4px;
  border-radius: 4px;
  border: solid white 2px;
  background-color: ${lighten(0.2, colors.purple)};
  padding: 6px;
  div {
    p {
      color: ${colors.purple};
    }
  }
  p {
    color: yellow;
  }
`;

export const Button = styled.button`
  background-color: ${props => (props.purple ? colors.purple : colors.pink)};
`;

export default Wrapper;
