// Урок "Аккумулятор"

// Найдём все пустые директории в нашей файловой системе.

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
  const name = getName(tree);
  const children = getChildren(tree);
  if (children.length === 0) {
    return name;
  }

  const emptyDirNames = children
    .filter((child) => !isFile(child))
    .flatMap(findEmptyDirPaths);

  return emptyDirNames;
};

console.log(findEmptyDirPaths(tree)); // ['apache', 'data', 'logs']

const findEmptyDirPaths2 = (tree, maxDepth = Infinity) => {
  // let ancestry = [];
  // let result = [];
  const iter = (node, depth) => {
    const name = getName(node); // гет name, пушим все в массв ancestry , проверсяем на вхождение строки если это файл!!!,
    // когда  ДА, все это join и в результирующий массив запихиваем и обнуляем ancestry

    const children = getChildren(node);

    if (children.length === 0) {
      return name;
    }

    if (depth === maxDepth) {
      return [];
    }

    return children
      .filter(isDirectory) // не фильтровать
      .flatMap((child) => iter(child, depth + 1));
  };

  return iter(tree);
};

console.log(findEmptyDirPaths2(tree));
