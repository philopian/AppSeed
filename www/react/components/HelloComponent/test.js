import React from "react";
import { configure, shallow, mount, render } from "enzyme";
import renderer from "react-test-renderer";
import "raf/polyfill";
import Adapter from "enzyme-adapter-react-16";
import Component from "./index.js";

describe("HelloComponent (Snapshot)", () => {
  it("HelloComponent renders without crashing", () => {
    const component = renderer.create(<Component />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    const actual = 2 + 2;
    const expected = 4;
    expect(actual).toEqual(expected);
  });
});
