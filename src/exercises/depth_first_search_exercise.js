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
  mkdir('eTc', [mkdir('NgiNx'), mkdir('CONSUL', [mkfile('config.json')])]),
  mkfile('hOsts'),
]);

const downcaseFileNames = (tree) => {
  const name = getName(tree);

  const meta = _.cloneDeep(getMeta(tree));

  if (isFile(tree)) {
    const newName = name.toLowerCase();
    return mkfile(newName, meta);
  }

  const children = getChildren(tree);

  const newChildren = children.map((child) => downcaseFileNames()); // пофиксить

  const newTree = mkdir(name, newChildren, meta);

  return newTree;
};

//console.log(JSON.stringify(
downcaseFileNames(tree);
//);
