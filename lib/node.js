class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.children = {};
    this.favor = 0;
    // this.value = value;
    this.wordEnd = null;

  }
}

module.exports = Node;