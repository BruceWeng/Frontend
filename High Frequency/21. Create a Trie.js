class TrieNode {
  constructor() {
    this.isWord = false;
    this.children = {}; // <character, TrieNode[]>
  }
}

class Trie {
/**
 * Initialize your data structure here.
 */
  constructor() {
    this.root = new TrieNode();
  }

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
  insert(word) {
    let current = this.root;
    for (const char of word) {
      if (current.children[char] === undefined) current.children[char] = new TrieNode();
      current = current.children[char];
    }
    current.isWord = true;
  }

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
  search(word) {
    let current = this.root;
    for (const char of word) {
      if (current.children[char] === undefined) return false;
      current = current.children[char];
    }
    return current.isWord;
  }

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
  startsWith(prefix) {
    let current = this.root;
    for (const char of prefix) {
      if (current.children[char] === undefined) return false;
      current = current.children[char];
    }
    return true;
  }
}

const trie = new Trie();

trie.insert("apple");
console.log(trie.search("apple"));   // returns true
console.log(trie.search("app"));     // returns false
console.log(trie.startsWith("app")); // returns true
trie.insert("app");   
console.log(trie.search("app"));     // returns true