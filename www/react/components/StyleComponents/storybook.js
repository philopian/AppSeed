import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { setConsoleOptions } from "@storybook/addon-console";

import React from "react";
import Component from "./index.js";

setConsoleOptions({
  panelExclude: [/[HMR]/]
});

const Info = {
  componentSection: "Components",
  title: "Style Components",
  about:
    "This is a simple component to show how to style components. The base styles come from the ./www/sass/global.scss and any additional styles come from the ./styles.js file",
  props: {
    message: "message passed",
    handleClick: action("[Style Components] - click")
  }
};

storiesOf(Info.componentSection, module)
  .addDecorator(withKnobs)
  .add(Info.title, withInfo(Info.about)(() => <Component {...Info.props} />));
