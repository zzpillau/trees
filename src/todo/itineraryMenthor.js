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

// BEGIN
const makeJoints = (tree, parent) => {
  const [leaf, children] = tree;
  // console.log(leaf);
  // console.log(children);
  console.log('parent', parent);

  if (!children) {
    console.log({ [leaf]: [parent] });
    return { [leaf]: [parent] };
  }

  const flatChildren = _.flatten(children);
  // console.log(flatChildren, 'flatChildren');

  const neighbors = [...flatChildren, parent].filter(
    (neighbor) => neighbor && !_.isArray(neighbor),
  );
  const joints = children.reduce(
    (acc, child) => ({ ...acc, ...makeJoints(child, leaf) }),
    {},
  );

  return { [leaf]: neighbors, ...joints };
};

const findRoute = (start, finish, joints) => {
  const iter = (current, route) => {
    const routeToCurrent = [...route, current];

    if (current === finish) {
      return routeToCurrent;
    }

    const neighbors = joints[current];
    const filtered = neighbors.filter(
      (neighbor) => !routeToCurrent.includes(neighbor),
    );

    return filtered.reduce(
      (acc, neighbor) => _.concat(acc, iter(neighbor, routeToCurrent)),
      [],
    );
  };

  return iter(start, []);
};

const itinerary = (tree, start, finish) => {
  const joints = makeJoints(tree);
  return findRoute(start, finish, joints);
};
// END
console.log(itinerary(tree, 'Rzhev', 'Borisovka'));
// 'Rzhev', 'Tver', 'Moscow', 'Voronezh', 'Kursk', 'Belgorod', 'Borisovka'
