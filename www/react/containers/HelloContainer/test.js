import React from "react";
import Enzyme, { configure, shallow, mount, render } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { HelloContainer as Component } from "./HelloContainer.jsx";

Enzyme.configure({ adapter: new Adapter() });

const mockLoginfn = jest.fn();
const props = {
  hello: "......",
  sampleData: {},
  fetchSampleData: mockLoginfn
};

describe("HelloContainer (Snapshot)", () => {
  it("HelloContainer renders without crashing", () => {
    const mockLoginfn = jest.fn();
    const component = renderer.create(<Component {...props} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe("Component", () => {
  let component;
  const mockLoginfn = jest.fn();
  beforeEach(() => {
    component = shallow(<Component {...props} />);
  });

  // ...tests here...
});

// Logic
describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    expect(2 + 2).toBe(4);
  });
});
