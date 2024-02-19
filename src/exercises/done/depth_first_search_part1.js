// Урок "Обход дерева"

// Обход в глубину (Depth-first search) БАЗОВЫЙ СПОСОБ

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

const dfs = tree => {
  console.log(getName(tree));

  if (isFile(tree)) {
    console.log(tree);
    return;
  }

  const children = getChildren(tree);

  children.forEach(dfs); // ммм, рекурсия!
};

console.log(dfs(tree));
