class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let node = new Node(val);

    if(this.root === null){
      this.root = node;
      return this;
    }

    let temp = this.root;

    while(temp != null) {
      if(temp.val > val) {
        if(temp.left === null) {
          temp.left = node;
          return this;
        } else {
          temp = temp.left;
        }
      } else if(temp.val < val) {
        if(temp.right === null) {
          temp.right = node;
          return this;
        } else {
          temp = temp.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, temp = this.root) {
    let node = new Node(val);

    if(this.root === null) {
      this.root = node;
      return this;
    }

    if(temp.val > val) {
      if(temp.left === null) {
        temp.left = node;
        return this;
      }
      return this.insertRecursively(val, temp.left);
    } else {
      if(temp.right === null) {
        temp.right = node;
        return this;
      }
      return this.insertRecursively(val, temp.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let temp = this.root;
    let isFound = false;

    while(temp) {
      if(temp.val === val) return temp;
      if(temp.val > val) {
        temp = temp.left;
      } else if(temp.val < val) {
        temp = temp.right
      } else {
        isFound = true
      }
    }
    if(isFound = true) return undefined;
    return temp;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, temp = this.root) {
    if(temp === null) return undefined;
    if(temp.val > val) {
      if(temp.left === null) {
        return undefined;
      }
      return this.findRecursively(val, temp.left);
    } else if(temp.val < val) {
      if(temp.right === null) {
        return undefined;
      }
      return this.findRecursively(val, temp.right);
    }
    return temp;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let temp = this.root;
    let tree = [];

    const traverse = (node) => {
      tree.push(node.val);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }
    traverse(temp);
    return tree;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let temp = this.root;
    let tree = [];

    const traverse = (node) => {
      node.left && traverse(node.left);
      tree.push(node.val);
      node.right && traverse(node.right);
    }
    traverse(temp);
    return tree;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let temp = this.root;
    let tree = [];

    const traverse = (node) => {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      tree.push(node.val);
    }
    traverse(temp);
    return tree;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let temp = this.root;
    let tree = [];
    let queue = [];
    queue.push(temp);

    while(queue.length) {
      temp = queue.shift();
      tree.push(temp.val);
      if(temp.left) {
        queue.push(temp.left);
      }
      if(temp.right) {
        queue.push(temp.right);
      }
    }
    return tree;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = this._remove(this.root, val);
  }
  _remove(node, val) {
    if (node === null) {
      return null;
    }

    if (val < node.val) {
      node.left = this._remove(node.left, val);
    } else if (val > node.val) {
      node.right = this._remove(node.right, val);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right; 
      } else if (node.right === null) {
        return node.left;
      } else {
        const minRight = this._findMin(node.right);
        node.val = minRight.val;
        node.right = this._remove(node.right, minRight.val);
      }
    }

    return node;
  }
  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    return this._isBalanced(this.root) !== -1;
  }
  _isBalanced(node) {
    if (node === null) {
      return 0;
    }

    const leftHeight = this._isBalanced(node.left);
    const rightHeight = this._isBalanced(node.right);

    if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }
    return Math.max(leftHeight, rightHeight) + 1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root) {
      return undefined;
    }

    let secondHighest = undefined;
    let count = 0;

    const reverseInOrder = (node) => {
      if (!node || count >= 2) {
        return;
      }

      reverseInOrder(node.right);

      count++;
      if (count === 2) {
        secondHighest = node.val;
        return;
      }

      reverseInOrder(node.left);
    };
    reverseInOrder(this.root);
    return secondHighest;
  }
}

module.exports = BinarySearchTree;
