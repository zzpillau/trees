// подсказка https://www.youtube.com/watch?v=95_U0FfM26Q

// Перед прохождением данного испытания рекомендуется пройти испытание "Трансформер".
// puzzle.js

// Реализуйте и экспортируйте по умолчанию функцию, которая объединяет отдельные ветки в одно дерево. Каждая из веток в свою очередь является также деревом.

// Функция может принимать на вход неограниченное количество веток и соединяет их. Корневым узлом объединённого дерева является корневой узел первой переданной ветки.
// Примеры

const branch1 = [
  'A',
  [
    //   A
    [
      'B',
      [
        //   |
        ['C'], //   B
        ['D'], //  / \
      ],
    ], // C   D
  ],
];

const branch2 = [
  'B',
  [
    //   B
    [
      'D',
      [
        //   |
        ['E'], //   D
        ['F'], //  / \
      ],
    ], // E   F
  ],
];

const branch3 = [
  'I',
  [
    //   I
    [
      'A',
      [
        //   |
        [
          'B',
          [
            //   A
            ['C'], //   |
            ['H'], //   B
          ],
        ], //  / \
      ],
    ], // C   H
  ],
];

combine(branch1, branch2, branch3);

// ['A', [      //     A
//   ['B', [    //    / \
//     ['C'],   //   B   I
//     ['D', [  //  /|\
//       ['E'], // C D H
//       ['F'], //  / \
//     ]],      // E   F
//     ['H'],
//   ]],
//   ['I'],

// ]];

// Подсказки

// Другие примеры можно посмотреть в файле с тестами
// Используйте функции из библиотеки lodash
// Работа с иерархическими структурами данных
// подсказка https://www.youtube.com/watch?v=95_U0FfM26Q

// @ts-check

import { sortTree } from '@hexlet/graphs';
import combine from '../puzzle.js';

describe('combine', () => {
  const branch1 = ['A', [['B', [['C'], ['D']]]]];

  const branch2 = ['B', [['D', [['E'], ['F']]]]];

  const branch3 = ['I', [['A', [['B', [['C'], ['H']]]]]]];

  it('#test1', () => {
    const expected = [
      'A',
      [['B', [['C'], ['D', [['E'], ['F']]], ['H']]], ['I']],
    ];

    const actual = combine(branch1, branch2, branch3);
    expect(sortTree(actual)).toEqual(expected);
  });

  it('#test2', () => {
    const expected = [
      'B',
      [['A', [['I']]], ['C'], ['D', [['E'], ['F']]], ['H']],
    ];

    const actual = combine(branch2, branch1, branch3);
    expect(sortTree(actual)).toEqual(expected);
  });

  it('#test3', () => {
    const expected = [
      'I',
      [['A', [['B', [['C'], ['D', [['E'], ['F']]], ['H']]]]]],
    ];

    const actual = combine(branch3, branch2, branch1);
    expect(sortTree(actual)).toEqual(expected);
  });

  it('#test4', () => {
    const expected = [
      'B',
      [['A', [['I']]], ['C'], ['D', [['E'], ['F']]], ['H']],
    ];

    const actual = combine(branch2, branch3);
    expect(sortTree(actual)).toEqual(expected);
  });
});
