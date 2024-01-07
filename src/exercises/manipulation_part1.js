// Урок "Манипуляции с виртуальной файловой системой"

// Базовые операции с узлами

import {
  mkfile,
  mkdir,
  isFile,
  isDirectory,
  getChildren,
  getMeta,
  getName,
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [mkfile('hexlet.log')], { hidden: true });
console.log(JSON.stringify(tree, null, ' '));

const name = getName(tree);
console.log(name);

const newMeta1 = getMeta(tree);
console.log(newMeta1);

const newMeta2 = getMeta(tree).hidden;
console.log(newMeta2);

const [file] = getChildren(tree);
console.log(file);

console.log(isFile(file));
console.log(isDirectory(file));

const newMeta3 = getMeta(file);
console.log(newMeta3);

console.log(isDirectory(tree));
console.log(isFile(tree));
