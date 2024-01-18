const flatten = (array) => {
  const flattedItems = array.reduce((acc, item) => {
    if (!Array.isArray(item)) {
      acc.push(item);
      return acc;
    }
    const newItem = flatten(item);
    return [...acc, ...newItem];
  }, []);
  return flattedItems;
};

const list = [1, 2, [3, 5], [[4, 3], 2]];

console.log(flatten(list)); // [1, 2, 3, 5, 4, 3, 2]
