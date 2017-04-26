const { describe, it } = require('mocha');
const chai = require('chai');
const { expect } = require('chai');
const Sprint = require('../src/models/sprint.js');


describe('Sprint', () => {
  it('should exist', () => {
    expect(Sprint).not.to.be.undefined;
  })
});