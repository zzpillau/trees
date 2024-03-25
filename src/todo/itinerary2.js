import _ from 'lodash';

const tree = [
  'Moscow',
  [
    ['Smolensk'],
    ['Yaroslavl'],
    [
      'Voronezh',
      [
        ['Liski'],
        ['Boguchar'],
        ['Kursk', [['Belgorod', [['Borisovka']]], ['Kurchatov']]],
      ],
    ],
    ['Ivanovo', [['Kostroma'], ['Kineshma']]],
    ['Vladimir'],
    ['Tver', [['Klin'], ['Dubna'], ['Rzhev']]],
  ],
];

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
console.log(flat);

const itinerary = (tree, start, end, result = []) => {
  make_flat(tree, flat);

  const [hub] = tree;
  // console.log(hub);
  result.push(start);
  console.log('start res', result);
  const after = [];

  const startPointInfo = flat[start];
  console.log(startPointInfo);

  const children = startPointInfo.children;
  const parent = startPointInfo.parent;

  console.log('parent', parent);
  console.log('children', children);

  const workWithChildren = (childrenList) => {
    let stack = [];

    const wWC = (children) => {
      children.forEach((child) => {
        const subChildren = flat[child].children; // саб дети как массив
        console.log(subChildren, 'subChildren');

        if (stack.length) {
          console.log('working on a stack', stack);
          console.log('last', _.last(stack));
          console.log('child.parent', flat[child].parent);
          //   console.log('prelast', _.last(stack.slice(0, -1)));

          const last = _.last(stack);
          console.log('IS???????????????????????', flat[child].parent !== last);
          if (flat[child].parent !== last) {
            stack = [];
          }
          // else {
          //   stack.pop();
          // }
        }

        // console.log(child);
        console.log(child);
        stack.push(child);
        console.log('stack push', stack);

        if (subChildren.includes(end)) {
          // если саб дети как массив содержат энд
          console.log(stack, 'stack to push');
          result.push(stack, end);
          stack = [];
          console.log("NOW I'LL PUSH the end");
          // result.push(end);
          console.log('FOUND');
        }

        if (!subChildren.length) {
          stack.pop();
        }

        // stack = [];
        wWC(subChildren);
      });
    };
    return wWC(childrenList);
  };

  workWithChildren(children, after);
  console.log('after', after);

  if (parent === end || children.includes(end)) {
    result.push(end);
    return result;
  }

  if (parent !== undefined) {
    // result.push(parent);

    itinerary(tree, parent, end, result);

    workWithChildren(children, after);
    console.log('after', after);

    // return [result, after, 'rec'];
  }
  // return _.flattenDeep(result);
  return _.flatten(result);
};

// console.log(itinerary(tree, 'Dubna', 'Kostroma')); // ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma']

// console.log(itinerary(tree, 'Borisovka', 'Kurchatov')); // ['Borisovka', 'Belgorod', 'Kursk', 'Kurchatov']

// console.log(itinerary(tree, 'Rzhev', 'Moscow'));
// 'Rzhev', 'Tver', 'Moscow'

// console.log(itinerary(tree, 'Ivanovo', 'Kursk'));
// 'Ivanovo', 'Moscow', 'Voronezh', 'Kursk'

// console.log(itinerary(tree, 'Tver', 'Dubna'));
// 'Tver', 'Dubna'

console.log(itinerary(tree, 'Rzhev', 'Borisovka'));
// 'Rzhev', 'Tver', 'Moscow', 'Voronezh', 'Kursk', 'Belgorod', 'Borisovka'
