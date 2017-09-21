import React from 'react';
import 'jest-styled-components';
import cheerio from 'cheerio';
import { mount, shallow, render } from 'enzyme';
import renderer from 'react-test-renderer';
import SimpleBanner from '../components/SimpleBanner.jsx';

/* 
 * styled-components doesn't seem to work 100% with enzyme, so i'm using cheerio to do jquery like navication.
 * Anytime you use a styled-component to make a element enzyme doesn't recognize it as styled.div or the variable you gave it
 * ENZYME REF: // http://airbnb.io/enzyme/docs/api/index.html
 */

// SNAP-SHOTS
describe('SimpleBanner (Snapshot)', () => {
  it('SimpleBanner renders hello world', () => {
    const component = renderer.create(<SimpleBanner message="world" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});


// UI pieces
describe('SimpleBanner', () => {
  test('Shallow Rendering, make sure it renders somethins', () => {
    const wrapper = shallow(
      <SimpleBanner />
    );
    expect(wrapper.length).toEqual(1)
  });
  test('Full Rendering', () => {
    //Full DOM rendering is ideal for use cases where you have components that may interact with DOM apis, or may require the full lifecycle in order to fully test the component 
    const props = { message: 'world' };
    const wrapper = mount(
      <SimpleBanner message={props.message} />
    );
    const span = wrapper.find('span');
    expect(span.text()).toBe('Hello ');
  });
  test('Make sure there is an element with the class simple-banner', () => {
    const wrapper = shallow(
      <SimpleBanner />
    );
    expect(
      wrapper.find('.simple-banner').exists()
    ).toBe(true);
  });
  test('Make sure there is a span element', () => {
    const wrapper = shallow(
      <SimpleBanner />
    );
    const $ = cheerio.load(wrapper.html());
    expect($('span').length).toEqual(1);
    expect($('span').text()).toContain('Hello');
  });
});


// Business Logic