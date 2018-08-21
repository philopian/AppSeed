import React from "react";
import Enzyme, { configure, shallow, mount, render } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import Component from "./index.js";

Enzyme.configure({ adapter: new Adapter() });

/**
 * ENZYME DOCS: http://airbnb.io/enzyme/docs/guides/jest.html
 * JEST EXPECT DOCS: https://jestjs.io/docs/en/expect.html
 *
 *
 * https://github.com/facebook/jest/tree/master/examples
 * https://www.youtube.com/watch?v=8Ww2QBVIw0I&feature=youtu.be
 * https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f
 *
 *
 *
 */

// Test the Component
describe("HiThere (Snapshot)", () => {
  it("HiThere renders without crashing", () => {
    const component = renderer.create(<Component />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe("Whole component", () => {
  it("Make sure the props are being passing thru to the component", () => {
    const component = shallow(<Component message="hello jest" />);
    const actual = component.find(".props-message").text();
    const expected = "hello jest";
    expect(actual).toEqual(expected);
  });

  it("initial state", () => {
    const component = shallow(<Component />);
    const instance = component.instance();
    const actual = instance.state;
    const expected = {
      username: "",
      clickCount: 0,
      clickMessage: "",
      parentMessage: ""
    };
    expect(actual).toEqual(expected);
  });

  it("state should change setState is fired", () => {
    const component = shallow(<Component />);
    const instance = component.instance();
    instance.setState({ clickMessage: "updated with jest!" });
    const actual = instance.state.clickMessage;
    const expected = "updated with jest!";
    expect(actual).toEqual(expected);
  });
});

describe("Local input section", () => {
  it("H1 should have the text hello there", () => {
    const component = shallow(<Component message="hello jest" />);
    const actual = component.find("h1").text();
    const expected = "hi there";
    expect(actual).toEqual(expected);
  });

  it("Local message should change after click", () => {
    const component = shallow(<Component message="hello jest" />);
    const USERNAME = "SomeUser";
    const changeValue = { target: { value: USERNAME } };
    component.find(".username").simulate("change", changeValue);
    expect(component.find(".click-message").text()).toEqual("");
    component.find(".local-message button").simulate("click");
    const actual = component.find(".click-message").text();
    const expected = `Hello ${USERNAME}, you just clicked a button!`;
    expect(actual).toEqual(expected);
  });

  it("When the input changes the state should change", () => {
    const component = shallow(<Component />);
    const NEW_VALUE = "... this is changed";
    component
      .find(".username")
      .simulate("change", { target: { value: NEW_VALUE } });
    const instance = component.instance();
    const actual = instance.state.username;
    const notExpected = "llll";
    const expected = NEW_VALUE;
    expect(actual).not.toEqual(notExpected);
    expect(actual).toEqual(expected);
  });
});

describe("Things passed to parent", () => {
  it("Props Method gets called", () => {
    const spy = jest.fn(); // spy are "fake" function that let's to track metrics
    const component = shallow(<Component handleClickForParent={spy} />);
    component.find(".parent-message button").simulate("click");
    component.find(".parent-message button").simulate("click");
    expect(spy).toBeCalled();
    expect(spy).toHaveBeenCalled();
    const actual = spy.mock.calls.length;
    const expected = 2;
    expect(actual).toEqual(expected);
  });
});

// Test the logic
describe("Class Methods", () => {
  it("calcSum()", () => {
    const component = renderer.create(<Component />);
    const x1 = 5;
    const x2 = 55;
    const actual = component.getInstance().calcSum(x1, x2);
    const expected = x1 + x2;
    expect(actual).toEqual(expected);
  });
});
