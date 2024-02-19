const result = {};

const makeObj = (data) => {
  const [parent, children] = data;

  const func = (children) => {
    const getWithChildren = _.flatten(children).reduce((acc, child, i, arr) => {
      const newParent = arr[i - 1];
      if (_.isArray(child)) {
        acc[newParent] = func(child);
      } else {
        acc[child] = {};
      }
      return acc;
    }, {});
    return getWithChildren;
  };
  result[parent] = func(children);
  return result;
};

// console.log(JSON.stringify(makeObj(tree), null, ' '));
