import _ from 'lodash';

// function depthFirstSearch(graph, start) {
//   const visited = {};
//   const path = [];

//   function dfs(node) {
//     visited[node] = true;
//     path.push(node);

//     for (const neighbor of graph[node]) {
//       if (!visited[neighbor]) {
//         dfs(neighbor);
//       }
//     }
//   }

//   dfs(start);

//   return path;
// }

const sortDeps = (deps) => {
  const keys = Object.keys(deps);
  const pins = _.uniq(_.flattenDeep(keys));
  console.log(pins);

  const start = pins[0];

  const visited = {};
  const stack = [];

  const dfs = (node) => {
    visited[node] = true;
    stack.push(node);

    for (const subNode of deps[node]) {
      if (!visited[subNode]) {
        dfs(subNode);
      }
    }
  };
  dfs(start);

  return stack;
};

// const sortDeps = (deps) => {
//   const entries = Object.entries(deps);

//   const pins = _.uniq(_.flattenDeep(entries));
//   const [x] = pins;
//   console.log(pins);
//   console.log(x);

//   const dfs = (deps, start) => {
//     const visited = {};

//     const stack = [start];
//     console.log(stack);

//     const reduce = pins.reduce((acc, pin) => {
//       console.log(pin);
//       if (stack.length !== 0) {
//         const vert = stack.shift(); // удаление первого ! элемента из стэка
//         console.log(vert);

//         if (!visited[vert]) {
//           visited[vert] = true; // добавление посещенной вершины
//           console.log(visited);
//         }
//         if (deps[vert]) {
//           console.log(deps[vert]);
//           for (let subVert of deps[vert]) {
//             console.log(subVert);
//             if (visited[subVert]) {
//               console.log('visited', visited);
//               stack.unshift(subVert);
//               console.log(stack);
//             }
//             visited[subVert] = true;
//             console.log('visited', visited);
//           }
//         }
//       }
//       console.log('stack', stack);
//       return (acc = [...stack]);
//     }, []);
//     return reduce;
//   };

//   return dfs(deps, x);
// };

const deps1 = {
  mongo: [],
  tzinfo: ['thread_safe'],
  uglifier: ['execjs'],
  execjs: ['thread_safe', 'json'],
  redis: [],
};

// console.log(sortDeps(deps1));
// => ['mongo', 'thread_safe', 'tzinfo', 'json', 'execjs', 'uglifier', 'redis'];

const deps2 = {
  wrong: ['predicated', 'sexp_processor'],
  xpath: ['nokogiri'],
  predicated: ['htmlentities'],
  sexp_processor: [],
  nokogiri: ['wrong'],
  virtus: [],
};

console.log(depthFirstSearch(deps1, 'mongo'));

// ['htmlentities', 'predicated', 'sexp_processor', 'wrong', 'nokogiri', 'xpath', 'virtus'];
