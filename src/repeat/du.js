// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход директорию
// и возвращает список вложенных узлов (директорий и файлов) в указанную директорию на один уровень,
// а так же место, которое они занимают. Размер файла задается в метаданных.
// Размер директории складывается из сумм всех размеров файлов, находящихся внутри
// во всех поддиректориях. Сами директории размера не имеют.

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

const tree2 = mkdir('consul', [
  mkfile('config.json', { size: 1200 }),
  mkfile('data', { size: 8200 }),
  mkfile('raft', { size: 80 }),
]);

const tree3 = mkdir('etc', [
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
    const meta = _.cloneDeep(getMeta(node));
    return meta.size;
  }

  const children = getChildren(node);

  const sizeCountChildren = children.map(sizeCount);
  return _.sum(sizeCountChildren);
};

console.log(sizeCount(tree));

const du = (tree) => {
  const children = getChildren(tree);

  const result = children.map((child) => [getName(child), sizeCount(child)]);

  return result.sort(([, size1], [, size2]) => size2 - size1);
};

console.log(du(tree));
console.log(du(tree2));
console.log(du(tree3));
