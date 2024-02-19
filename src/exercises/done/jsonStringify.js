import _ from 'lodash';

const symbol = (str, count) => str.repeat(count);

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  if (!typeof value === 'object') {
    return `${value}`; //  не влияет на строку
  }
  let depth = 0;
  const space = symbol(replacer, spacesCount);

  const keys = Object.keys(value ?? 'null');
  const reduce = keys.reduce((acc, key, i, arr) => {
    if (value[key] === null) {
      value[key] = 'null'; //  не влияет на строку
    }
    if (typeof value[key] === 'object') {
      
      depth += 1;
      console.log(depth);
      acc = `${acc}${symbol(replacer, spacesCount)}HERE${key}: {\n${stringify(
        value[key],
        space,
        depth,
      )}}HEREEEEE\n`; // рекурсия

      return acc;
    }
    acc = `${acc}${space}HMMMM${key}: ${value[key]}\n`; // обычная строка
    return acc;
  }, '');
  return reduce;
};

const nested = {
  string: 'value',
  boolean: true,
  number: 5,
  float: 1.25,
  object: {
    5: 'number',
    1.25: 'float',
    null: 'null',
    true: 'boolean',
    value: 'string',
    nested: {
      boolean: true,
      float: 1.25,
      string: 'value',
      number: 5,
      null: null,
    },
  },
};

console.log(stringify(nested, '|-', 3));
