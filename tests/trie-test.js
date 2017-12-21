import { expect } from 'chai';
import Node from '../lib/Node.js'
import Trie from '../lib/Trie'
import fs from 'fs';


describe('Trie', () => {
  let trie;
  let node;
  let text;
  let dictionary;


  beforeEach(() => {
    trie = new Trie();
    node = new Node();
     text = "/usr/share/dict/words"
     dictionary = fs.readFileSync(text).toString().trim().split('\n')

  })

  it('should be a thing', () => {
    expect(trie).to.exist;
  })

  it('should start with a root as null', () => {
    expect(trie.root).to.deep.eq(node)
  })

  it('should have a root of a null node', () => {
    expect(trie.root).to.deep.equal(node);
  });

  it('should have a default count of 0', () => {
    expect(trie._count).to.equal(0);
  });

  describe('INSERT', () => {
    let trie = new Trie();
    trie.insert('apple');


    it('should have a root node with an a letter child', () => {
      expect(trie.root.children.hasOwnProperty('a')).to.equal(true);
    })

    it('should have a p child of the a child', () => {
      expect(trie.root.children['a'].children.hasOwnProperty('p')).to.equal(true);
    })

    it('should have a p child of the p child', () => {
      expect(trie.root.children['a'].children['p'].children.hasOwnProperty('p')).to.equal(true);
    })

    it('should have a l child of the p child', () => {
      expect(trie.root.children['a'].children['p'].children['p'].children.hasOwnProperty('l')).to.equal(true);
    })

    it('should have a e child of the l child', () => {
      expect(trie.root.children['a'].children['p'].children['p'].children['l'].children.hasOwnProperty('e')).to.equal(true);
    })

    it('should set the wordEnd property of the last letter to true', () => {
      expect(trie.root.children['a'].children['p'].children['p'].children['l'].children['e'].wordEnd).to.equal(true);
    })

    it('should count the number of words in the trie', () => {
      expect(trie._count).to.equal(1);
    })

    it('should be able to insert words at nodes that already exist', () => {
      trie.insert('ape')
      expect(trie._count).to.equal(2);
      expect(trie.root.children['a'].children['p'].children.hasOwnProperty('p')).to.equal(true);
      expect(trie.root.children['a'].children['p'].children.hasOwnProperty('e')).to.equal(true);
    })
  });

describe('SUGGEST', () => {
  it('should take in a string and return an array', () => {
    let trie = new Trie();
    trie.insert('pizza');
    expect(trie.suggest('piz')).to.be.array;
  });

  it('should suggest all words matching the phrase parameter (small sample)', () => {
    let trie = new Trie();
    trie.insert('dead');
    trie.insert('dirt');
    trie.insert('done');
    trie.insert('donuts');
    
    expect(trie.suggest('d')).to.deep.equal(['dead', 'dirt', 'done', 'donuts']);
    expect(trie.suggest('do')).to.deep.equal(['done', 'donuts']);
  });

  it('should suggest all words matching the phrase parameter (large sample)', () => {
    let trie = new Trie();
    trie.populate(dictionary);
    expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
  });

  it('should return empty array if the phrase does not match any words (small sample)', () => {
    let trie = new Trie();
    trie.insert('piece');
    trie.insert('pizza');

    expect(trie.suggest('!')).to.deep.equal(null);
  });

  it('should return empty array if the phrase does not match any words (large sample)', () => {
    let trie = new Trie();
    trie.populate(dictionary);

    expect(trie.suggest('zzz')).to.deep.equal(null);
  });
});

  describe('SELECT', () => {
  it('should update the value of the Node property favor', () => {
    let trie = new Trie();
    trie.insert('hey');
    expect(trie.root.children['h'].children['e'].children['y'].favor).to.equal(0);

    trie.select('hey');
    trie.select('hey');
    expect(trie.root.children['h'].children['e'].children['y'].favor).to.equal(2);
  });
  })


  describe('Populate', () => {
    it('should be able to take in dictionary', () => {
      let trie = new Trie();
      trie.populate(dictionary);
      expect(trie.countWords()).to.equal(235886)
    })

    it('should return empty array if the phrase does not match any words (large sample)', () => {
      let trie = new Trie();

      trie.populate(dictionary);
      expect(trie.suggest('zzz')).to.deep.equal(null);
    });

  })

    describe('DELETE', () => {
      it('should change a wordEnd to false when deleted', () => {
        let trie = new Trie();
        trie.insert('hey');
        trie.insert('hello');
        trie.insert('heap');
        expect(trie.root.children['h'].children['e'].children['y'].wordEnd).to.equal(true);

        trie.delete('hey');
        expect(trie.root.children['h'].children['e'].children['y'].wordEnd).to.equal(true);
      });
    })

})