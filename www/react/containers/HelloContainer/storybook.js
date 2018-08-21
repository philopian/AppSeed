import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { setConsoleOptions } from "@storybook/addon-console";

import React from "react";
import { HelloContainer as Component } from "./HelloContainer.jsx";

setConsoleOptions({
  panelExclude: [/[HMR]/]
});

const Info = {
  componentSection: "Container",
  title: "HelloContainer",
  about: "this is a simple example container",
  mockProps: {
    hello: "welcome user",
    sampleData: { yes: "a little sample data for you" },
    fetchSampleData: () => action("fetchSampleData")
  }
};

storiesOf(Info.componentSection, module)
  .addDecorator(withKnobs)
  .add(
    Info.title,
    withInfo(Info.about)(() => <Component {...Info.mockProps} />)
  );
