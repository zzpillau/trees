// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход файловое
// дерево и подстроку, а возвращает список файлов, имена которых содержат эту подстроку.
// Функция должна вернуть полные пути до файлов.

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

const findFilesByName = (tree, subStr) => {
  const iter = (node, ancestry) => {
    const name = getName(node);
    const newAncestry = path.join(ancestry, name);
    if (isFile(node)) {
      return name.includes(subStr) ? newAncestry : [];
    }

    const children = getChildren(node);

    return children.flatMap((child) => iter(child, newAncestry)); // здесь принимает дитя и новое значение аккума
  };

  return iter(tree, ''); // здесь задается начальное значение аккумулятора
};

console.log(findFilesByName(tree, 'co'));
// ['/etc/nginx/nginx.conf', '/etc/consul/config.json']
