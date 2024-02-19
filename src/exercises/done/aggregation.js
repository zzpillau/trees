// Урок "Агрегация"

// Подсчёт общего количества узлов в дереве

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

// считаем все узлы 1 и 1 вернуть для файла и для директории

const getNodesCount = (node) => {
  if (isFile(node)) {
    console.log('find file'); // тут мы нашли и обработали файл и вернули для него то, что надо
    return 1;
  }

  const children = getChildren(node);
  console.log(children);

  const descendantCounts = children.map(getNodesCount);

  //console.log(descendantCounts);
  console.log('find dir'); // тут мы нашли и обработали директорию и вернули для нее то, что надо

  return 1 + _.sum(descendantCounts);
};

console.log(getNodesCount(tree));

//так можно посчитать файлы

const getFilesCount = (node) => {
  if (isFile(node)) {
    return 1;
  }

  const children = getChildren(node);

  const filesCount = children.map(getFilesCount);

  return _.sum(filesCount);
};

console.log(getFilesCount(tree));

//так можно посчитать директории

const getDirectoryCount = (node) => {
  if (isFile(node)) {
    return 0;
  }

  const children = getChildren(node);

  const filesCount = children.map(getDirectoryCount);

  return 1 + _.sum(filesCount);
};

console.log(getDirectoryCount(tree));
