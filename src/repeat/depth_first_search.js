import {
  mkfile,
  mkdir,
  isFile,
  isDirectory,
  getChildren,
  getMeta,
  getName,
} from '@hexlet/immutable-fs-trees';

import _ from 'lodash';

const tree = mkdir('/', [
  mkdir('etc', [mkfile('bashrc'), mkfile('consul.cfg')]),
  mkfile('hexletrc'),
  mkdir('bin', [mkfile('ls'), mkfile('cat')]),
]);

const dfs = (tree) => {
  console.log(getName(tree));
  if (isFile(tree)) {
    return;
  }

  const children = getChildren(tree);

  children.forEach(dfs);
};

dfs(tree);
