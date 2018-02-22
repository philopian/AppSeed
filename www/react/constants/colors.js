import { lighten, darken } from "polished";

// Overriding styles
const colors = {
  green: "rgb(50, 204, 168)",
  pink: "rgb(202, 72, 151)",
  purple: "rgb(135, 82, 148)",
  purpleDark: darken(0.2, "rgb(47, 120, 191)"),
  purpleLight: lighten(0.2, "rgb(47, 120, 191)")
};
export default colors;