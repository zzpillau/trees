const convert = (array) => {
  const reduced = array.reduce((acc, item) => {
    const [key, value] = item;
    // console.log(key);
    // console.log(value);
    // console.log(acc);
    if (!Array.isArray(value)) {
      acc[key] = value;
      return acc;
    }
    acc[key] = convert(value);
    return acc;
  }, {});

  return reduced;
};

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
