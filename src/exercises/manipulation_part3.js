// Урок "Манипуляции с виртуальной файловой системой"

// Сортировка содержимого директории

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

// сортировка детей в обратном порядке

const tree = mkdir('/', [mkfile('one'), mkfile('two'), mkfile('three')]);

// достаем детей

const children = getChildren(tree);
console.log(children);

const newChildren = [...children].reverse();
console.log(newChildren);

// достаем мета

const newMeta = getMeta(tree);
console.log(newMeta);

// создаем новое дерево, имя на этом этапе достаем

const tree2 = mkdir(getName(tree), newChildren, newMeta);

console.log(JSON.stringify(tree2, null, ' '));
