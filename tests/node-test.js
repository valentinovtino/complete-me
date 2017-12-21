import { expect } from 'chai';
import Node from '../lib/Node'

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  })

  it('should be a thing', () => {
    expect(node).to.exist;
  })

  it('should default letter to null', () => {
    expect(node.letter).to.equal(null);
  })

  it('should have a default children property of an empty object', () => {
    expect(node.children).to.deep.equal({});
  })

  it('should have a wordEnd property of false', () => {
    expect(node.wordEnd).to.equal(null);
  })

  it('should take in a letter', () => {
    node = new Node('a');
    expect(node.letter).to.equal('a');
  });
});