const convert = (array) =>
  array.reduce((acc, item) => {
    const [key, value] = item;
    if (!Array.isArray(value)) {
      acc[key] = value;
      return acc;
    }
    acc[key] = convert(value);
    return acc;
  }, {});

console.log(convert([])); // {}
console.log(convert([['key', 'value']])); // { key: 'value' }
console.log(
  convert([
    ['key', 'value'],
    ['key2', 'value2'],
  ]),
); // { key: 'value', key2: 'value2' }
console.log(
  convert([
    ['key', [['key2', 'anotherValue']]],
    ['key2', 'value2'],
  ]),
);
// { key: { key2: 'anotherValue' }, key2: 'value2' }
