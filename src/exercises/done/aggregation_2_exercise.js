// Урок "Агрегация 2"

// список директорий первого уровня вложенности и
// количество файлов внутри каждой из них,
// включая все поддиректории

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

const tree2 = mkdir('etc', [
  mkdir('apache'),
  mkdir('nginx', [mkfile('nginx.conf', { size: 800 })]),
  mkdir('consul', [
    mkfile('config.json', { size: 1200 }),
    mkfile('data', { size: 8200 }),
    mkfile('raft', { size: 80 }),
  ]),
]);

const sizeCount = (node) => {
  if (isFile(node)) {
    return _.cloneDeep(getMeta(node)).size ?? 0;
  }

  const children = getChildren(node);

  const result = children.map(sizeCount);

  return _.sum(result);
};

const du = (node) => {
  if (isFile(node)) {
    return [node.name, sizeCount(child) ?? 0]; // это не нужно
  }
  const children = getChildren(node);
  const names = children.map((child) => [child.name, sizeCount(child)]);

  return names.sort((a, b) => b[1] - a[1]);
};

console.log(du(tree));
console.log(du(tree2));
