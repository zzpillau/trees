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

console.log('_.fromPairs');

console.log(_.fromPairs(_.flattenDepth(tree)));

const itinerary = (cities, start, end) => {
  const citiesList = _.flattenDeep(cities);
  const visited = {};

  let startPoint = '';
  console.log('startPoint', startPoint);
  let endPoint = startPoint === start ? end : start;
  console.log('endPoint', endPoint);

  const goBackward = (value, result) => {
    console.log('going forward');
    return result.push(value);
  };
  const goForward = (value, result) => {
    console.log('going backward');
    return result.unshift(value);
  };

  const setDirection = (value, result) => {
    return startPoint === start
      ? goForward(value, result)
      : goBackward(value, result);
  };

  // const isPoint = point === start || point === end;
  // startPoint = point === start ? start : end;
  // console.log('realstartPoint!!!!!!!!!!!!!!!!!!!!!!!!!!!', startPoint);

  const searchPoint = (pointList) => {
    return pointList.reduce((acc, point) => {
      console.log('iteration!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('point', point);
      const subPoints = pointList[point];
      console.log('subPoints', subPoints);

      if (subPoints) {
        console.log(point);

        searchPoint(subPoints);
      }
      return acc;
    }, []);
  };
  return searchPoint(citiesList);
};

// console.log(itinerary(tree, 'Dubna', 'Kostroma')); // ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma']

// console.log(itinerary(tree, 'Borisovka', 'Kurchatov')); // ['Borisovka', 'Belgorod', 'Kursk', 'Kurchatov']
