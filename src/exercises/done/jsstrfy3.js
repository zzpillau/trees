// iter
// depth
// map

const symbol = (str, count) => str.repeat(count);

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  if (!typeof value === 'object') {
    return `${value}`; //  не влияет на строку
  }
  const iter = (node, depth) => {
    const space = symbol(replacer, spacesCount * depth);
    const keys = Object.keys(node ?? 'null');

    const reduce = keys.reduce((acc, key, i, arr) => {
      if (node[key] === null) {
        node[key] = 'null'; //  не влияет на строку
      }
      if (depth === arr.length) {
        return reduce;
      }
      if (typeof node[key] !== 'object') {
        acc = `${acc}${space}${key}: ${node[key]}\n`;
        return acc;
      }
      acc = `${acc}${space}${key}: {\n${iter(node[key], depth + 1)}${symbol(
        replacer,
        spacesCount * depth,
      )}}\n`;
      return acc;
    }, '');
    return reduce;
  };
  return `{\n${iter(value, 1)}}`;
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

console.log(stringify(nested, '|-', 2));
