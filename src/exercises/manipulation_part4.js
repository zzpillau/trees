// Урок "Манипуляции с виртуальной файловой системой"

// Обновление содержимого директории

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

// Приведение к нижнему регистру имён директорий и файлов
// внутри конкретной директории

const tree = mkdir('/', [mkfile('oNe'), mkfile('Two'), mkfile('THREE')]);

// отрабатываем детей

const children = getChildren(tree);
console.log(children);

const newChildren = children.map(child => {
  const name = getName(child); // сначала вытаскиваем имя
  const newMeta = _.cloneDeep(getMeta(child)); // достаем мета, и - для файла этого хватит
  if (isDirectory(child)) {
    // а вот если ребенок - директория, работаем с его детьми, просто их достаем,т.к. другой задачи не стоит
    const children = [...getChildren(child)];
    return mkdir(name.toLowerCase(), children, newMeta);
  }
  return mkfile(name.toLowerCase(), newMeta);
});
// console.log(JSON.stringify(newChildren, null, ' '));

// разбираемся с мета

const newMeta = getMeta(tree);

// создаем новое дерево

const tree2 = mkdir(getName(tree), newChildren, newMeta);
console.log(JSON.stringify(tree2, null, ' '));
