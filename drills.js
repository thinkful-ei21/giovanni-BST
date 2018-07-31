'use strict';

const BST = require('./bst');

const main = () => {

  let myTree = new BST();
  myTree.insert(3);
  myTree.insert(1);
  myTree.insert(4);
  myTree.insert(6);
  myTree.insert(9);
  myTree.insert(2);
  myTree.insert(5);
  myTree.insert(7);
  myTree.remove(3);

  //console.log(myTree)
  //console.log(height(myTree))
  //console.log(bstCheck(myTree))
  //console.log(thirdLargest(myTree));
  console.log(isBST(myTree));
};

const isBST = (tree)=>{
    
  if(!tree){return null;}

  const collectLeaves =(tree, depth)=>{
    depth ++;

    
    if((!tree.left)&&(!tree.right)){
    //   console.log('depth of ', tree.key, 'is:',depth)
      return [depth];
    }
    
    let leaves = [];

    if(tree.left){
        
      leaves = [...leaves, ...collectLeaves(tree.left, depth)];
    }
    if(tree.right){
        
      leaves = [...leaves, ...collectLeaves(tree.right, depth)];
    }
    // console.log(leaves)

    return leaves;

  };

  let leaves = collectLeaves(tree, 0);
  
  let deepest = Number.NEGATIVE_INFINITY;
  let shallowest = Number.POSITIVE_INFINITY;
  
  for(let n of leaves){
    if(n > deepest){deepest = n;}
    if(n < shallowest){shallowest = n;}
  }

  return (deepest - shallowest <= 1);
};


const thirdLargest =(tree)=>{

  if(!tree){return null;}

  const getValues = (tree, depth) =>{
    let values = [tree.key];
    if(tree.left && depth > 0){
      values = [...values, ...getValues(tree.left, depth -1)];
    }
    if(tree.right && depth > 0){
      values = [...values, ...getValues(tree.right, depth - 1)];
    }
    return values;
  };

    
  let second = null;
  let third = null;

  let current = tree;

  while(current.right){
    current = current.right;
  }
  let largest = current;

  let values = [];
  
  if(current.parent){
    values = [...values, ...getValues(current.parent, 2)];
  }
  if(current.left){
    values = [...values, ...getValues(current.left, 2)];
  }

  let filtered = [];
  values.forEach(v => {
    if(!filtered.includes(v) && v !==current.key){filtered.push(v);}
  });


  for(let val of filtered){
    if(val > second){
      third = second;
      second = val;
    }
    else if(val > third){
      third = val;
    }

  }



  return third;
};

const bstCheck = (tree)=>{
  if(!tree.key){return true;}
  else if ((!tree.left) &&(!tree.right)){return true;}
  else {
    let left = true;
    let right = true;
    if(tree.left){
      left = bstCheck(tree.left);
    }
    if(tree.right){
      right = bstCheck(tree.right);
    }
    if(right && left){return true;}
    else{return false;}
  }

};


const height = (tree)=>{

  if(!tree.key){
    return 0;
  }

  let left = 0;
  let right = 0;
  if(tree.left){
    left = height(tree.left);
  }
  if(tree.right){
    right = height(tree.right);
  }

  return left > right? left +1 : right +1;

};

main();