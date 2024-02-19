const deps1 = {
  mongo: [],
  tzinfo: ['thread_safe'],
  uglifier: ['execjs'],
  execjs: ['thread_safe', 'json'],
  redis: [],
};

const makeObjTree = (obj) => {
  const keys = Object.keys(obj);
  let result = [];
  for (let i = 0; i < keys.length; i += 1) {
    const parent = keys[i];
    const children = obj[keys[i]];
    result.push({ parent, children });
  }
  return result;
};

// console.log(sortDeps(deps1));
// => ['mongo', 'thread_safe', 'tzinfo', 'json', 'execjs', 'uglifier', 'redis'];

const sortDeps = (deps) => {
  const depList = makeObjTree(deps);

  const iter = (treeOfDeps, acc) => {
    const map = treeOfDeps.map((dep) => {
      
    });

    acc.push(map);


    return iter(children, acc)
  };

  return iter(depList, []);
};

console.log(sortDeps(deps1));

//     const child = deps[key];
//     console.log('child =', child);
//     console.log(child.length);
//     if (child.length === 0) {
//       acc.includes(key) ? acc.push([]) : acc.push(key);
//       console.log(acc);
//       return acc;
//     }
//     acc.includes(child) ? acc.push([]) : acc.push(child);
//     console.log(acc);
//     return acc;

// => ['mongo', 'thread_safe', 'tzinfo', 'json', 'execjs', 'uglifier', 'redis'];
