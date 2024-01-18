// Урок "Агрегация"

// Подсчёт скрытых файлов в директории и поддиректориях

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
    mkdir('nginx', [mkfile('.nginx.conf', { size: 800 })]),
    mkdir('.consul', [
      mkfile('.config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('.hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

const tree2 = mkdir('/', [
  mkdir('.etc', [
    mkdir('.apache'),
    mkdir('nginx', [mkfile('.nginx.conf', { size: 800 })]),
  ]),
  mkdir('.consul', [
    mkfile('config.json', { size: 1200 }),
    mkfile('.raft', { size: 80 }),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

const getHiddenFilesCount = (node) => {
  const name = getName(node);

  if (isFile(node)) {
    return name.startsWith('.') ? 1 : 0;
  }

  const children = getChildren(node);

  const hiddenFilesCount = children.map(getHiddenFilesCount);

  return _.sum(hiddenFilesCount);
};

console.log(getHiddenFilesCount(tree)); // 3);
