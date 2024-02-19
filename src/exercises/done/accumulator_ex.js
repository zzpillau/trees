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

import path from 'path';

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [mkfile('nginx.conf', { size: 800 })]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

const findFilesByName = (tree, text) => {
  const iter = (node, depth, defaultAncestry = '') => {
    console.log(typeof defaultAncestry);
    const name = getName(node);
    console.log(name);

    const newAncestry = path.join(defaultAncestry, name);

    if (isFile(node)) {
      return name.includes(text) ? newAncestry : [];
    }

    const children = getChildren(node);

    return children.flatMap((child) => iter(child, depth + 1, newAncestry));
  };

  return iter(tree, 0);
};

console.log(findFilesByName(tree, 'co'));

// ['/etc/nginx/nginx.conf', '/etc/consul/config.json']
