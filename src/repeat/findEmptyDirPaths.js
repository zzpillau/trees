// Найдём все пустые директории, но с максимальной глубиной поиска 2 уровня.

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
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [mkfile('nginx.conf')]),
    mkdir('consul', [mkfile('config.json'), mkdir('data')]),
  ]),
  mkdir('logs'),
  mkfile('hosts'),
]);

const findEmptyDirPaths = (tree) => {
  const iter = (node, depth) => {
    const name = getName(node);
    const children = getChildren(node);

    if (children.length === 0) {
      return name;
    }

    if (depth === 2) {
      return [];
    }
    const result = children
      .filter(isDirectory)
      .flatMap((child) => iter(child, depth + 1));

    return result;
  };

  return iter(tree, 0);
};

console.log(findEmptyDirPaths(tree));

const iter = (node, depth) => {
  const name = getName(node);
  const children = getChildren(node);

  if (children.length === 0) {
    return name;
  }

  if (depth === 2) {
    return [];
  }
  const result = children
    .filter(isDirectory)
    .flatMap((child) => iter(child, depth + 1));

  return result;
};

console.log(iter(tree, 0));
