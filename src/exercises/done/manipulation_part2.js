// Урок "Манипуляции с виртуальной файловой системой"

//Изменение имени файла

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

const file = mkfile('one', { size: 35 });

const newMeta = _.cloneDeep(getMeta(file));
console.log(newMeta);

const newFile = mkfile('newName', newMeta);
console.log(newFile);
