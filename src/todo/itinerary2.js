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

const flat = {};
make_flat(tree, flat);
// console.log('flat', JSON.stringify(flat, null, ' '));

// console.log(flat['Moscow']);

const itinerary = (tree, start, end) => {
  const point = tree[start];
  console.log(point.parent);
  console.log(point.children);

  const children = point.children ?? [];
  const parent = point.parent ?? [];

  console.log(children);
  console.log(parent);

  // if (parent !== end) {
  //   itinerary(point, point.parent, end);
  // }
  return end;
};

console.log(itinerary(flat, 'Dubna', 'Kostroma'));

// console.log(itinerary(tree, 'Dubna', 'Kostroma')); // ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma']

// console.log(itinerary(tree, 'Borisovka', 'Kurchatov')); // ['Borisovka', 'Belgorod', 'Kursk', 'Kurchatov']
