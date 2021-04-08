class FileNode {
  constructor() {
    this.isFile = false;
    this.content = '';
    this.children = {}; // <fileName, FileNode>
  }
}
class FileSystem {
  constructor() {
    this.root = new FileNode();
  }

  ls(path) {
    let current = this.root;
    let dir_name = '';
    const directories = path.split('/');
    for(const dir of directories) {
      if(dir.length===0) continue;
      current = current.children[dir];
      dir_name = dir;
    }
    if(current.isFile===true) return [dir_name];
    else return Object.keys(current.children).sort();
  }

  mkdir(path) {
    let current = this.root;
    const directories = path.split('/');
    for(const dir of directories) {
      if(dir.length===0) continue;
      if(current.children[dir]===undefined) current.children[dir] = new FileNode();
      current = current.children[dir];
    }
    return null;
  }

  addContentToFile(path, content) {
    let current = this.root;
    const directories = path.split('/');
    for(const dir of directories) {
      if(dir.length===0) continue;
      if(current.children[dir]===undefined) current.children[dir] = new FileNode();
      current = current.children[dir];
    }
    current.isFile = true;
    current.content += content;
    return null;
  }

  readContentFromFile(path) {
    let current = this.root;
    const directories = path.split('/');
    for(const dir of directories) {
      if(dir.length===0) continue;
      current = current.children[dir];
    }
    return current.content;
  }
}

const fs = new FileSystem();
console.log(fs.ls('/')); // []
console.log(fs.mkdir('/a/b/c')); // null
console.log(fs.addContentToFile('/a/b/c/d', 'hello')); // null
console.log(fs.ls('/')); // ['a']
console.log(fs.readContentFromFile('/a/b/c/d')); // 'hello'

/**
 * Note:
 * You can assume all file or directory paths are absolute paths which begin with '/' and do not end with '/' except that the path is just '/'.
 * You can assume that all operations will be passed valid parameters and users will not attempt to retrieve file content or list a directory or file that does not exist.
 * You can assume that all directory names and file names only contain lower-case letters, and same names won't exist in the same directory.
 */