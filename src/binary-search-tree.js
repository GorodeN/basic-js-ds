const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootValue = null;
  }

  root() {
    return this.rootValue;
  }

  add(data) {
    this.rootValue = this.addNode(this.rootValue, data);
  }

  addNode(node, data) {
    if (node === null) {
      return new Node(data);
    }

    if (data < node.data) {
      node.left = this.addNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.addNode(node.right, data);
    }

    return node;
  }

  has(data) {
    return this.findNode(this.rootValue, data) !== null;
  }

  find(data) {
    return this.findNode(this.rootValue, data);
  }

  findNode(node, data) {
    if (node === null) return null;
    
    if (data === node.data) return node;
    if (data < node.data) return this.findNode(node.left, data);
    return this.findNode(node.right, data);
  }

  remove(data) {
    this.rootValue = this.removeNode(this.rootValue, data);
  }

  removeNode(node, data) {
    if (node === null) return null;

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      const minNode = this.findMin(node.right);
      node.data = minNode.data;
      node.right = this.removeNode(node.right, minNode.data);
      return node;
    }
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  min() {
    if (this.rootValue === null) return null;
    return this.findMin(this.rootValue).data;
  }

  max() {
    if (this.rootValue === null) return null;
    
    let node = this.rootValue;
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};