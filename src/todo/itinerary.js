// @ts-check

import _ from 'lodash';

// BEGIN (write your solution here)
const make_flat = (tree, accumulator, parent = undefined) => {
  const [node, branches] = tree;
  let children = [];
  accumulator[node] = { parent, children };

  branches.forEach((branch, i, arr) => {
    if (branch.length > 1) {
      const name = make_flat(branch, accumulator, node);
      children.push(name);
    } else {
      children.push(...branch);
      parent = node;
      accumulator[branch] = { parent, children: [] };
    }
  });
  return node;
};

// console.log('flat', JSON.stringify(flat, null, ' '));

// console.log(flat['Moscow']);

const flat = {};

const itinerary = (tree, start, end, result = []) => {
  make_flat(tree, flat);

  const [hub] = tree;
  // console.log(hub);
  result.push(start);
  // console.log('start res', result);
  const after = [];

  const startPointInfo = flat[start];
  // console.log(startPointInfo);

  const children = startPointInfo.children;
  const parent = startPointInfo.parent;

  // console.log('parent', parent);
  // console.log('children', children);

  const workWithChildren = (childrenList, accum) => {
    const subIter = (children) => {
      children.forEach((child, i) => {
        const subChildren = flat[child].children;

        if (subChildren.includes(end)) {
          console.log("NOW I'LL PUSH");
          result.push(child, end);
          console.log('FOUND', accum);
        }

        if (subChildren.length > 0) {
          subIter(subChildren);
        }
      });
    };
    return subIter(childrenList);
  };

  workWithChildren(children, after);
  console.log('after', after);

  if (parent === end || children.includes(end)) {
    result.push(end);
    return [result, 'first res'];
  }

  if (parent !== undefined) {
    // result.push(parent);

    itinerary(tree, parent, end, result);

    workWithChildren(children, after);
    console.log('after', after);

    // return [result, after, 'rec'];
  }
  return result;
};

export default itinerary;
// END
