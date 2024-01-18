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
  mkdir('etc', [mkdir('apache'), mkdir('nginx', [mkfile('nginx.conf')])]),
  mkdir('consul', [mkfile('config.json'), mkfile('file.tmp'), mkdir('data')]),
  mkfile('hosts'),
  mkfile('resolve'),
]);

const getFilesCount = (node) => {
  if (isFile(node)) {
    return 1;
  }

  const children = getChildren(node);

  const filesCount = children.map(getFilesCount);

  return _.sum(filesCount);
};

console.log(getFilesCount(tree));

const getSubdirectoriesInfo = (node) => {
  const children = getChildren(node);
  const result = children
    .filter(isDirectory)
    .map((child) => [getName(child), getFilesCount(child)]);

  return result;
};

console.log(getSubdirectoriesInfo(tree));
