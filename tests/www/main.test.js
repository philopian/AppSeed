/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Main from '../../www/js/main.js';


let m = {};
before((done) => {
  m = new Main();
  // console.log(`\n  ${m.html()} \n\n`);
  done();
});

describe('second tests', () => {
  it('should pass', () => {
    expect(true).to.not.be.true;
  });
  it('main file should have a method called html that returns a string', () => {
    expect(true).to.be.true;
  });
});