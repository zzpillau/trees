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

const changeOwner = (tree, owner) => {
  const name = getName(tree);
  const newMeta = _.cloneDeep(getMeta(tree));
  newMeta.owner = owner;

  if (isFile(tree)) {
    return mkfile(name, newMeta);
  }

  const children = getChildren(tree);

  const newChildren = children.map((child) => changeOwner(child, owner));

  const newTree = mkdir(name, newChildren, newMeta);

  return newTree;
};

const newOwner = 'kukusya';

const newTree = changeOwner(tree, newOwner);

console.log(JSON.stringify(newTree, null, ' '));
