class maxHeap {
  constructor () {
    this.heap = []
    this.len = 0
  }
  

  getHeap () {
    return this.heap
  }

  getLeftChildIndex (index) {
    return (2 * index) + 1
  }

  getRightChildIndex (index) {
    return 2 * index + 2
  }

  getParentIndex (index) {
    return Math.floor((index-1)/2))
  }

  hasLeftChild (index) {
    return this.getLeftChildIndex < this.len
  }

  hasRightChild (index) {
    return this.getRightChildIndex < this.len
  }

  hasParent (index) {
    return this.getParentIndex > -1
  }

  leftChild (index) {
    return this.heap[this.getLeftChildIndex[index]]
  }

  rightChild (index) {
    return this.heap[this.getRightChildIndex[index]]
  }

  parent (index) {
    return this.heap[this.getParentIndex[index]]
  }

  removemax () {
    if (this.len === 0) throw new Error('Empty heap')
    let max = this.heap[0]
    this.heap[0] = this.heap[this.len-1]
    this.len--
    this.heapifyDown(0)
    return max
  }

  add (data) {
    this.heap[this.len] = data
    this.len++
    this.heapifyUp(this.len-1)
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1]
    ];
  }

  heapifyDown (index) {
    let largest = index
    if (this.hasLeftChild && this.heap[largest] < this.leftChild[index]) largest = this.leftChild[index]
    if (this.hasRightChild && this.heap[largest] < this.rightChild[index]) largest = this.rightChild[index]
    if (largest != index) {
       this.swap(index, largest)
       this.heapifyDown(largest)
    }
}

heapifyUp (index) {
  if (this.hasParent(index) && this.parent[index] > this.heap[index]){
    this.swap(index, this.getParentIndex(index))
    this.heapifyUp(this.getParentIndex(index))
  }
}

}

let maxHeap = new MaxHeap(target)

function isPossible (target) {
  if (target === Array(target.length).fill(1)) return true
  let max = maxHeap.removemax()

  const [value, index] = max
  maxHeap.add([value, index])

  let arrSum = 0
  for (let i=0; i<target.length; i++) {
    if (i != index) arrSum += target[i]
  }
  target[index] -= arrSum
  if(target[index] < 1) return false
  return isPossible(target)
}