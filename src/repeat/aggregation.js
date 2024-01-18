import {
  mkfile,
  mkdir,
  isFile,
  isDirectory,
  getChildren,
  getMeta,
  getName,
} from "@hexlet/immutable-fs-trees";

import _ from "lodash";

const tree = mkdir("/", [
  mkdir("etc", [mkfile("bashrc"), mkfile("consul.cfg")]),
  mkfile("hexletrc"),
  mkdir("bin", [mkfile("ls"), mkfile("cat")]),
]);

// считаем общее колво узлов в дереве

const getNodesCount = (tree) => {
  // возвращаем результат для текущего файла
  if (isFile(tree)) {
    console.log(1);
    return 1;
  }

  // а если директория:

  const children = getChildren(tree);
  console.log(children);
  const descendantCounts = children.map(getNodesCount); // здесь массив из чисел формируется, изменяется по ходу
  console.log(descendantCounts);

  return 1 + _.sum(descendantCounts); // возврат для текущей директории
  // добираемся рекурсивно до корня, производится сложение всех descendant
  // рекурсия снизу вверх отрабатывает результат, когда накопит в памяти все состояния
};

console.log(getNodesCount(tree));
