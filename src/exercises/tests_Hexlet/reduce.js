// В курсе JS: Функции мы проходили три основные функции высшего порядка по работе с коллекциями: map, filter и reduce. С помощью них можно решать практически любые задачи.
// solution.js

// В этом испытании вам предстоит написать собственную реализацию этих функций, только работать они будут с файловыми деревьями.

// map принимает на вход функцию-обработчик и дерево, а возвращает отображенное дерево.

// filter принимает в качестве параметров предикат и дерево, а возвращает отфильтрованное дерево по предикату.

// reduce кроме основных параметров (функция-обработчик и дерево) принимает также начальное значение аккумулятора.

// Все функции необходимо экспортировать.
// Примеры

import {
  mkdir,
  mkfile,
  getName,
  isDirectory,
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [mkdir('eTc', [mkfile('config.json')])]);

// Приводим имена всех директорий и файлов к верхнему регистру:

map((n) => ({ ...n, name: getName(n).toUpperCase() }), tree);

// {

//   name: '/',

//   type: 'directory',

//   meta: {},

//   children: [

//     {

//       name: 'ETC',

//       type: 'directory',

//       meta: {},

//       children: [{ name: 'CONFIG.JSON', type: 'file', meta: {} }],

//     },

//   ],

// }

// Отфильтровываем директории:

filter((n) => isDirectory(n), tree);

// {

//   name: '/',

//   type: 'directory',

//   meta: {},

//   children: [

//     {

//       name: 'etc',

//       type: 'directory',

//       meta: {},

//       children: [],

//     },

//   ],

// }

// Подсчитываем количество узлов в дереве:

reduce((acc, n) => acc + 1, tree, 0); // 3

// @ts-check

import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
import { filter } from '../solution.js';

test('filter 1', () => {
  const tree = mkdir('/', [
    mkdir('etc', [
      mkdir('nginx', [mkdir('conf.d')]),
      mkdir('consul', [mkfile('config.json')]),
    ]),
    mkfile('hosts'),
  ]);
  const actual = filter((n) => n.type === 'directory', tree);

  const expected = {
    children: [
      {
        children: [
          {
            children: [
              {
                children: [],
                meta: {},
                name: 'conf.d',
                type: 'directory',
              },
            ],
            meta: {},
            name: 'nginx',
            type: 'directory',
          },
          {
            children: [],
            meta: {},
            name: 'consul',
            type: 'directory',
          },
        ],
        meta: {},
        name: 'etc',
        type: 'directory',
      },
    ],
    meta: {},
    name: '/',
    type: 'directory',
  };

  expect(actual).toEqual(expected);
});

test('filter 2', () => {
  const tree = mkdir('/', [
    mkdir('etc', [
      mkdir('nginx', [mkdir('conf.d')]),
      mkdir('consul', [mkfile('config.json')]),
    ]),
    mkfile('hosts'),
  ]);
  const names = new Set(['/', 'hosts', 'etc', 'consul']);
  const actual = filter((n) => names.has(n.name), tree);

  const expected = {
    children: [
      {
        children: [
          {
            children: [],
            meta: {},
            name: 'consul',
            type: 'directory',
          },
        ],
        meta: {},
        name: 'etc',
        type: 'directory',
      },
      {
        name: 'hosts',
        meta: {},
        type: 'file',
      },
    ],
    meta: {},
    name: '/',
    type: 'directory',
  };
  expect(actual).toEqual(expected);
});
// @ts-check

import _ from 'lodash';
import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
import { map } from '../solution.js';

test('immutable', () => {
  const tree = mkdir('/', [
    mkdir('eTc', [mkdir('NgiNx'), mkdir('CONSUL', [mkfile('config.json')])]),
    mkfile('hOsts'),
  ]);
  const original = _.cloneDeep(tree);

  map((n) => ({ ...n, name: n.name.toUpperCase() }), tree);

  expect(tree).toEqual(original);
});

test('map 1', () => {
  const tree = mkdir('/', [
    mkdir('eTc', [mkdir('NgiNx'), mkdir('CONSUL', [mkfile('config.json')])]),
    mkfile('hOsts'),
  ]);

  const actual = map((n) => ({ ...n, name: n.name.toUpperCase() }), tree);

  const expected = {
    children: [
      {
        children: [
          {
            children: [],
            meta: {},
            name: 'NGINX',
            type: 'directory',
          },
          {
            children: [{ meta: {}, name: 'CONFIG.JSON', type: 'file' }],
            meta: {},
            name: 'CONSUL',
            type: 'directory',
          },
        ],
        meta: {},
        name: 'ETC',
        type: 'directory',
      },
      { meta: {}, name: 'HOSTS', type: 'file' },
    ],
    meta: {},
    name: '/',
    type: 'directory',
  };

  expect(actual).toEqual(expected);
});

// @ts-check

import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
import { reduce } from '../solution.js';

test('reduce 1', () => {
  const tree = mkdir('/', [
    mkdir('eTc', [mkdir('NgiNx'), mkdir('CONSUL', [mkfile('config.json')])]),
    mkfile('hOsts'),
  ]);
  const actual = reduce((acc) => acc + 1, tree, 0);
  expect(actual).toEqual(6);

  const actual2 = reduce(
    (acc, n) => (n.type === 'file' ? acc + 1 : acc),
    tree,
    0,
  );
  expect(actual2).toEqual(2);

  const actual3 = reduce(
    (acc, n) => (n.type === 'directory' ? acc + 1 : acc),
    tree,
    0,
  );
  expect(actual3).toEqual(4);
});
