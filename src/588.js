let root = {};

function fsTrie(path, type, content = "", op = "add") {
  let node = root;
  path = path !== "/" ? path.split("/") : [];
  console.log("path is", path);

  for (let i of path) {
    if (i !== "") {
      //stringTillHere += `/${i}`;
      if (!node[i] || !node[i]?.type === type) node[i] = {};

      //else (node[i][type] != 'file')
      node = node[i];
    }
  }
  if (op === "list") {
    if (path === "/") node = root;
    return Object.keys(node);
  }

  if (op === "read") {
    return node.content;
  }

  if (op === "write") {
    if (!node.content) {
      node.content = content;
    } else node.content += " " + content;
  }

  return root;
}

console.log(
  "Built Trie is",
  fsTrie("/a/b/c/d/e", "file"),
  fsTrie("/a/b/e", "dir"),
  fsTrie("/a/b/c", "file"),
  fsTrie("/b/de/e", "dir")
);

var FileSystem = function () {
  //console.log("Added Trie is", this.addContentToFile('a/b/c/de/e', 'Hello'))
  return this;
};

FileSystem();
/**
 * @param {string} path
 * @return {string[]}
 */
FileSystem.prototype.ls = function (path) {
  return fsTrie(path, "dir", "", "list");
};

/**
 * @param {string} path
 * @return {void}
 */
FileSystem.prototype.mkdir = function (path) {
  fsTrie(path, "dir");
};

/**
 * @param {string} filePath
 * @param {string} content
 * @return {void}
 */
FileSystem.prototype.addContentToFile = function (filePath, content) {
  fsTrie(filePath, "file", content, "write");
};

FileSystem.prototype.readContentFromFile = function (filePath) {
  return fsTrie(filePath, "file", "", "read");
};

let fileSystem = new FileSystem();

fileSystem.addContentToFile("/a/b/c/d/e", "Hello");
fileSystem.addContentToFile("/a/b/c/d/e", "World");
fileSystem.addContentToFile("/a/b/c/d/e", "There");
console.log("Data is", fileSystem.readContentFromFile("/a/b/c/d/e"));
console.log("All contents are", fileSystem.ls("/"));
fileSystem.mkdir("/hello/there/i/come");
fileSystem.addContentToFile("/that/is/the/best", "told you that is the best");
console.log(
  "Data from file is",
  fileSystem.readContentFromFile("/that/is/the/best")
);

/**
 * @param {string} filePath
 * @return {string}
 */

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.ls(path)
 * obj.mkdir(path)
 * obj.addContentToFile(filePath,content)
 * var param_4 = obj.readContentFromFile(filePath)
 **/
