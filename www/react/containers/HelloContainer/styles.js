import styled from "styled-components";
import colors from "../../constants/colors";

// Overriding styles
export const Wrapper = styled.div`
  color: ${colors.white};
  background-color: ${colors.blue};
  padding: 10px;

  .from-store {
    font-weight: 700;
  }
`;
