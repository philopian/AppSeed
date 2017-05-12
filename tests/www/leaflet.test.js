/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import View from '../../www/js/leaflet.js';


let m = {};
before((done) => {
  m = new View();
  // console.log(`\n  ${m.html()} \n\n`);
  done();
});

describe('FILE: leaflet.js', () => {
  it('html() should return string of HTML', () => {
    expect(m.html()).to.be.a('string');
  });
  it('should pass', () => {
    expect(true).to.be.true;
  });
});