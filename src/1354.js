class MaxHeap {
  constructor() {
    this.heap = [];
    this.len = 0;
  }

  getHeap() {
    return this.heap;
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.len;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.len;
  }

  hasParent(index) {
    return this.getParentIndex(index) > -1;
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)][0];
  }

  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)][0];
  }

  parent(index) {
    return this.heap[this.getParentIndex(index)][0];
  }

  removemax() {
    if (this.len === 0) throw new Error("Empty heap");
    let max = this.heap[0];
    this.heap[0] = this.heap[this.len - 1];
    this.len--;
    this.heapifyDown(0);
    return max;
  }

  add(data) {
    this.heap[this.len] = data;
    this.len++;
    this.heapifyUp(this.len - 1);
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1]
    ];
  }

  heapifyDown(index) {
    let largest = index;
    if (
      this.hasLeftChild(index) &&
      this.heap[largest][0] < this.leftChild(index)
    )
      largest = this.getLeftChildIndex(index);
    if (
      this.hasRightChild(index) &&
      this.heap[largest][0] < this.rightChild(index)
    )
      largest = this.getRightChildIndex(index);
    if (largest != index) {
      this.swap(index, largest);
      this.heapifyDown(largest);
    }
  }

  heapifyUp(index) {
    if (this.hasParent(index) && this.parent(index) < this.heap[index][0]) {
      this.swap(index, this.getParentIndex(index));
      this.heapifyUp(this.getParentIndex(index));
    }
  }
}

let arr = [3, 4];
let maxHeap = new MaxHeap();

for (let i = 0; i < arr.length; i++) {
  maxHeap.add([arr[i], i]);
}

function isPossible(target) {
  if (JSON.stringify(target) === JSON.stringify(Array(target.length).fill(1)))
    return true;
  let max = maxHeap.removemax();

  const [value, index] = max;

  let arrSum = 0;
  for (let i = 0; i < target.length; i++) {
    if (i !== index) arrSum += target[i];
  }
  if (arrSum === 1) return true;
  target[index] = target[index] > arrSum ? target[index] % arrSum : 0;
  if (target[index] < 1) return false;
  maxHeap.add([target[index], index]);
  return isPossible(target);
}

console.log("Array is possible", isPossible(arr));
