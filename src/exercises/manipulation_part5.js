// Урок "Манипуляции с виртуальной файловой системой"

// Удаление файлов внутри директории

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

const tree = mkdir('/', [mkfile('one'), mkfile('two'), mkdir('three')]);

// работаем с детьми в основной директории, значит - достаем массив детей

const children = getChildren(tree);

const newChildren = children.filter(isDirectory);
console.log(newChildren);

const newMeta = getMeta(tree);

// создаем новое дерево

const tree2 = mkdir(getName(tree), newChildren, newMeta);
console.log(JSON.stringify(tree2, null, ' '));
