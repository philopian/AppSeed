import styled from "styled-components";
import { lighten } from "polished"; // https://polished.js.org/docs/ it have a bunch of functions to do css/sass stuff

import colors from "../../constants/colors";

const lightBlue = lighten(0.2, colors.blue);
export const Wrapper = styled.div`
  background-color: ${lightBlue};
  color: rgb(37, 37, 37);
  padding: 8px;

  button {
    color: #f15c5c;
    background-color: #feee7d;
    margin: 10px;
  }
  p {
    font-size: 20px;
    color: white;
    span {
      font-weight: 700;
    }
  }
`;
