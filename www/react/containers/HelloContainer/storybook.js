import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { setConsoleOptions } from "@storybook/addon-console";

const { Provider } = require("react-redux");
const { createStore } = require("redux");
const reducers = require("../../reducers").default;
const store = createStore(reducers);

import React from "react";
import Component from "./index.js";

setConsoleOptions({
  panelExclude: [/[HMR]/]
});

const Info = {
  componentSection: "Container",
  title: "HelloContainer",
  about: "this is a sample container",
  props: {
    xx: "Hello Container!",
    aa: action("Action Clicked")
  }
};

storiesOf(Info.componentSection, module)
  .addDecorator(withKnobs)
  .add(
    Info.title,
    withInfo(Info.about)(() => (
      <Provider store={store}>
        <Component />
      </Provider>
    ))
  );
