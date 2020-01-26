class TPos {
    constructor(elem, parent, left, right) {
        this._parent = parent;
        this._left = left;
        this._right = right;
        this._elem = elem;
    }
    element() {
        return this._elem;
    }
}
class BinaryTree {
    constructor() {
        this._root = null;
        this._size = 0;
    }
    size() {
        return this._size;
    }
    isEmpty() {
        return this._size == 0;
    }
    root() {
        return this._root;
    }
    isRoot(p) {
        return p == this._root;
    }
    parent(p) {
        return p._parent;
    }
    leftChild(p) {
        return p._left;
    }
    rightChild(p) {
        return p._right;
    }
    _isLeftChild(p) {
        return p != null && p._parent != null 
            && p._parent._left == p;
    }
    sibling(p) {
        if (this._isLeftChild(p)) {
            return p._parent._right;
        } else {
            return p._parent._left;
        }
    }
    isExternal(p) {
        return (p == null);
    }
    isInternal(p) {
        return (p != null);
    }
    replaceElement(p, e) {
        p._elem = e;
    }
    swapElements(p, q) {
        let temp = p._elem;
        p._elem = q._elem;
        q._elem = temp;
    }
    insertRoot(e) {
        if (this._size > 0) {
            throw new Error("Invalid insertRoot(e) to non-empty tree");
        }
        this._root = new TPos(e, null, null, null);
        this._size++;
        return this._root;
    }
    insertLeft(p, e) {
        if (this.isExternal(p) || this.isInternal(p._left)) {
            throw new Error("Invalid insertLeft(p,e) operation");
        }
        let newLeft = new TPos(e, p, null, null);
        p._left = newLeft;
        this._size++;
        return newLeft;
    }
    insertRight(p, e) {
        if (this.isExternal(p) || this.isInternal(p._right)) {
            throw new Error("Invalid insertRight(p,e) operation");
        }
        let newRight = new TPos(e, p, null, null);
        p._right = newRight;
        this._size++;
        return newRight;
    }
    remove(p) {
        if (this.isExternal(p)) {
            throw new Error("Invalid remove(p): p is not internal");
        }
        let parent = p._parent;
        let child = null;
        if (this.isExternal(p._left)) {
            child = p._right;
        } else if (this.isExternal(p._right)) {
            child = p._left;
        } else {
            throw new Error("Invalid remove(p): both children are internal");
        }
        if (this.isRoot(p)) {
            this._root = child;
            child._parent = null;
        } else {
            if (this._isLeftChild(p)) {
                parent._left = child;
            } else {
                parent._right = child;
            }
            if (this.isInternal(child)) {
                child._parent = parent;
            }
        }
        this._size--;
        return child;
    }
}

function heightOfTree(T) {
    return heightHelper(T,T.root(),0);
}

function heightHelper(T,p,height){
    if(T== null){
        return 0;
    }
    if(T.leftChild(p) == null ,T.rightChild(p) == null){
        return 0;
    } 
    if (T.leftChild(p) && T.rightChild(p)){
      return  Math.max( heightHelper(T,T.leftChild(p),height+1), heightHelper(T,T.rightChild(p),height+1));
    }
    else if(T.leftChild(p) && T.rightChild(p)==null ){
       return heightHelper(T,T.leftChild(p),height+1);
    }
    else {
        return heightHelper(T,T.rightChild(p),height+1);
    }
    return height;
}

function printMin(T) {
    return minValues(T,T.root());
}

// PRINTING ELEMENTS IN THE TREE LESS THAN A NUMBER
function minValues(T,p){
    let arrray = [];
    if(T.isExternal(p)){
        return 0;
    }
        if(p.element()<1000){
        console.log(p.element());
      minValues(T,T.leftChild(p));
      minValues(T,T.rightChild(p));
        }

    return arrray;
}

class EulerTour {
    constructor(T) {
        this._tree = T;
    }

    visitExternal(p, result) { }
    visitPreOrder(p, result) { }
    visitInOrder(p, result) { }
    visitPostOrder(p, result) { }

    eulerTour(p) {
        let result = new Array(3);
        if (this._tree.isExternal(p)) {
            this.visitExternal(p, result);
        } else {
            this.visitPreOrder(p, result);
            result[0] = this.eulerTour(this._tree.leftChild(p));
            this.visitInOrder(p, result);
            result[2] = this.eulerTour(this._tree.rightChild(p));
            this.visitPostOrder(p, result);
        }
        return result[1];
    }
}
//print the elements in the tree
class Print extends EulerTour {
    constructor(T) {
        super(T);
    }
    visitExternal(v, result) {
        result[1] = "";
    }
    visitPostOrder(v, result) {
        result[1] = "(" + result[0] + v.element() + result[2] +")" +"";
    }
    print() {
        if (this._tree.size() > 0) {
            console.log("Root="+this._tree.root().element());
        }
        let res = this.eulerTour(this._tree.root());
        console.log("[" + res + "]\n");
    }
}

//FINDING HEGHT OF the tree
class HeightOfTree extends EulerTour {
    constructor(T) {
        super(T);
    }
    visitExternal(v, result) {
        result[1] = 0;
    }
    visitPostOrder(v, result) {
        result[1] = Math.max(result[0]+1,result[2]+1);
    }
    height() {
        let res = this.eulerTour(this._tree.root());
        console.log(res);
    }
}

var t0 = new BinaryTree();
var printer = new Print(t0);
let height = new HeightOfTree(t0);


printer.print();

let r = t0.insertRoot(300);
printer.print();

let l1 = t0.insertLeft(r, 200);
let r1 = t0.insertRight(r, 400);
printer.print();
t0.insertRight(l1, 250);
l1 = t0.insertLeft(l1, 100);
t0.insertRight(l1, 150);
l1 = t0.insertLeft(l1, 50);
l1 = t0.insertLeft(r1, 350);
r1 = t0.insertRight(r1, 500);
t0.insertLeft(r1, 450);
r1 = t0.insertRight(r1, 600);
t0.insertLeft(r1, 550);
r1 = t0.insertRight(r1, 800);
printer.print();
t0.insertLeft(r1, 700);
printer.print();
height.height();
console.log(heightOfTree(t0));
console.log(printMin(t0));