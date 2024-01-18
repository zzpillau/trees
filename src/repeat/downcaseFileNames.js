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
  mkdir("eTc", [mkdir("NgiNx"), mkdir("CONSUL", [mkfile("config.json")])]),
  mkfile("hOsts"),
]);

const downcaseFileNames = (tree) => {
  const newName = getName(tree).toLowerCase(); // общая логика для узлов
  const meta = _.cloneDeep(getMeta(tree));

  if (isFile(tree)) {
    return mkfile(newName, meta); // терминальное условие - выход из рекурсии
  }

  const children = getChildren(tree); // добыли детей и применяем общую логику к детям-деревьям

  const newChildren = children.map(downcaseFileNames);

  return mkdir(newName, newChildren, meta); // возврат измененной директории
};

const newTree = downcaseFileNames(tree);

console.log(JSON.stringify(newTree, null, " "));
