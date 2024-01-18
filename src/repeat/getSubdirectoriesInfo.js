// Напишем функцию, которая принимает на вход директорию и возвращает список
// директорий первого уровня вложенности и количество файлов внутри каждой из них,
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

// Начнём с подсчёта количества файлов. Это классическая задача на агрегацию:

const getFilesCount = (node) => {
  if (isFile(node)) {
    return 1;
  }

  const children = getChildren(node);
  const descendantCounts = children.map(getFilesCount);
  return _.sum(descendantCounts);
};

// Следующий шаг заключается в том, чтобы извлечь
// всех детей из исходного узла и к каждому из них применить подсчёт:

const getSubdirectoriesInfo = (tree) => {
  const children = getChildren(tree);

  const result = children
    .filter(isDirectory)
    .map((child) => [getName(child), getFilesCount(child)]);

  return result;
};

console.log(getSubdirectoriesInfo(tree));
// => [['etc', 1], ['consul', 2]]

// работаем на 1 уроне вложенности, нам нужны их имена, поэтому в основной
// функции 1 раз выбираем детей и фильтруем. Это и будет 1 уровнем вложенности
