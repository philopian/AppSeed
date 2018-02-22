import React from "react";
import { configure, shallow, mount, render } from "enzyme";
import renderer from "react-test-renderer";
import "raf/polyfill";
import Adapter from "enzyme-adapter-react-16";
import Root from "./Root.jsx";

// Setup
// http://airbnb.io/enzyme/docs/api/
configure({ adapter: new Adapter() });

//--SNAP-SHOTS------
describe("Root (Snapshot)", () => {
  it("Root renders without crashing", () => {
    const component = renderer.create(<Root />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

//--UI pieces------
describe("Root", () => {
  test("Shallow Rendering, make sure it renders something", () => {
    // Shallow rendering, component's children will NOT be rendered
    const wrapper = shallow(<Root />);
    expect(wrapper.length).toEqual(1);
  });

  test("Full Rendering", () => {
    // Full rendering: component's children WILL be rendered
    const wrapper = mount(<Root />);
    expect(wrapper.find(".application-container").exists()).toEqual(true);
  });
});

//--Business Logic------
