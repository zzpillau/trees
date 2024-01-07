// Урок "Манипуляции с виртуальной файловой системой" - упражнение

import * as trees from '@hexlet/immutable-fs-trees';

import _ from 'lodash';

const tree = trees.mkdir('my documents', [
  trees.mkfile('avatar.jpg', { size: 100 }),
  trees.mkfile('passport.jpg', { size: 200 }),
  trees.mkfile('family.jpg', { size: 150 }),
  trees.mkfile('addresses', { size: 125 }),
  trees.mkdir('presentations'),
]);

const compressImages = tree => {
  const children = trees.getChildren(tree);

  const newChildren = children.map(child => {
    const newMeta = _.cloneDeep(trees.getMeta(child));
    if (child.name.includes('jpg')) {
      newMeta.size /= 2;
    }
    if (trees.isDirectory(child)) {
      const newChildren = trees.getChildren(clild);
      return trees.mkdir(trees.getName(child), newChildren, _.cloneDeep(trees.getMeta(child)));
    }
    return trees.mkfile(trees.getName(child), newMeta);
  });

  return trees.mkdir(trees.getName(tree), newChildren, _.cloneDeep(trees.getMeta(tree)));
};

const newTree = compressImages(tree);

console.log(JSON.stringify(newTree, null, ' '));
