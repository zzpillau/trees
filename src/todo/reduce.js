// @ts-check

import {
  mkdir,
  mkfile,
  getName,
  getMeta,
  isFile,
  isDirectory,
  getChildren,
} from '@hexlet/immutable-fs-trees';
import cloneDeep from 'lodash/cloneDeep.js';

// BEGIN (write your solution here)

const tree = mkdir('/', [mkdir('eTc', [mkfile('config.json', {})]), {}], {});
// console.log(JSON.stringify(tree, null, ' '));

const dfs = (tree) => {
  // Распечатываем содержимое узла
  console.log(getName(tree)); // cb
  // Если это файл, то возвращаем управление
  if (isFile(tree)) {
    // УСЛОВИЕ ВЫХОДА
    return;
  }

  // Получаем детей
  const children = getChildren(tree);

  // Применяем функцию dfs ко всем дочерним элементам
  // Множество рекурсивных вызовов в рамках одного вызова функции
  // называется древовидной рекурсией
  children.forEach(dfs);
};

// console.log(JSON.stringify(dfs(tree), null, ' '));

const cb = (n) => ({ ...n, name: getName(n).toUpperCase() });

const runEngine = (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    const currentUser = arr[i];
    const newViewForItem = cb(currentUser);
    result.push(newViewForItem);
  }
  return result;
};

const map = (cb, node) => {
  const newNode = { ...node };
  const name = getName(node);

  runEngine(node);

  if (isFile(node)) {
    return result;
  }

  const meta = getMeta(node);
  console.log(meta);
  const newMeta = cloneDeep(meta);
  const children = getChildren(node);

  children.forEach((child) => map(child));

  return result;
};

console.log(map(cb, tree));
// END
