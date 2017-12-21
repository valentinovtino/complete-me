import Node from '../lib/Node.js';

export default class Trie extends Node {
  constructor () {
    super(null)
    this.root = new Node(null)
    this._count = 0;
  }



    insert(string) {
      let currentNode = this.root;
      let stringArray = [...string]

      this._count++;

      for (var i = 0; i < stringArray.length; i++) {
        let data = stringArray[i];
        let child = new Node(data);

        if (!currentNode.children[data]) {
        currentNode.children[data] = child;
        currentNode = currentNode.children[data]
        } else {
          currentNode = currentNode.children[data]
       }
      }
     currentNode.wordEnd = true;
    }

    suggest(word) {
      let newWord = word.toLowerCase().split('');
      let currentNode = this.root;

      newWord.forEach ((letter) => {
        if (currentNode && currentNode.children) {
          currentNode = currentNode.children[letter]
        }
      })
      if (!currentNode) {
        return null;
      } else {
        return this.findSuggest(currentNode, word, [])
      }
    }

    findSuggest(currentNode, word, suggestions) {
      let childrenLetters = Object.keys(currentNode.children)

      childrenLetters.forEach( letter => {
        let letterNode = currentNode.children[letter];
        let newWord = word + letter;

        if (letterNode.wordEnd) {
          suggestions.push({word: newWord, favor: currentNode.favor})
        } else {
        this.findSuggest(letterNode, newWord, suggestions)
        }
      })
      return this.sortSuggestions(suggestions)
    }

    populate(words) {
      words.forEach(word => {
        this.insert(word);
      });
    }

    countWords() {
      return this._count;
    }

    select(string) {
      let currNode = this.root //.children[string[0]];
      let stringArray = [...string];

      stringArray.forEach((letter) => {
        currNode = currNode.children[letter] //moves down the tree until we hit our endWord and updates favor(select)
      })
      currNode.favor++;
    }

    sortSuggestions(suggestions) {
      suggestions.sort((a, b) => {b.favor - a.favor});

      return suggestions.map(item => item.word)
    }

    delete(word) {
      let wordToDelete = this.suggest(word);

      wordToDelete.wordEnd = false;
    }

}
















