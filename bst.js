'use strict';

class BinarySearchTree {
  constructor(key = null, value = null, parent = null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value){
    //if this.key = null, this is a leaf to be populated
    //otherwise compare key with this.key and either create a new root or pass to a child

    if(!this.key){
      this.key = key;
      this.value = value;
    }

    else if(key > this.key){
      if(!this.right){
        this.right = new BinarySearchTree(key,value, this);
      }
      else{
        //if there already is a right child
        this.right.insert(key,value);
      }

    }
    else{
      //if key <= this.key
      if(!this.left){
        this.left = new BinarySearchTree(key,value, this);
      }
      else{
        //if there already is a right child
        this.left.insert(key,value);
      }
    }
  }

  find(key){
    if(key === this.key){
      return this;
    }
    else if(key > this.key){
      if(!this.right){ return null; }
      else{return this.right.find(key);}
    }
    else{
      if(!this.left){return null; }
      else{return this.left.find(key);}
    }
  }
  
  remove(key){
    if(key === this.key ){
      if((!this.right) &&(!this.left)){
        this._replaceWith(null);
      }
      else if(!this.right){
        this._replaceWith(this.left);
      }
      else if(!this.left){
        this._replaceWith(this.right);
      }
      else {
        const node = this.right._findMin();
        this.key = node.key;
        this.value = node.value;
        node.remove(node.key);
      }

    }

    else if(key > this.key){
      if(!this.right){ return null; }
      else{return this.right.remove(key);}
    }
    else{
      if(!this.left){return null; }
      else{return this.left.remove(key);}
    }

  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        //should these equality tests be strict?
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

}





module.exports = BinarySearchTree;