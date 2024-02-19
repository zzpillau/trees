import _ from 'lodash';

const sortDeps = (deps) => {
  const vertexList = Object.keys(deps);
  const visited = {};

  const dfs = (depsList) => {
    console.log(
      depsList.forEach((key) => {
        const subVert = deps[key];
        if (subVert) {
          dfs(subVert);
        }
        if (!visited[key]) {
          visited[key] = true;
        }
      }),
    );
    return Object.keys(visited);
  };
  return dfs(vertexList);
};

const deps1 = {
  mongo: [],
  tzinfo: ['thread_safe'],
  uglifier: ['execjs'],
  execjs: ['thread_safe', 'json'],
  redis: [],
};

console.log(sortDeps(deps1));
// => ['mongo', 'thread_safe', 'tzinfo', 'json', 'execjs', 'uglifier', 'redis'];

const deps2 = {
  wrong: ['predicated', 'sexp_processor'],
  xpath: ['nokogiri'],
  predicated: ['htmlentities'],
  sexp_processor: [],
  nokogiri: ['wrong'],
  virtus: [],
};

// console.log(sortDeps(deps2));

// ['htmlentities', 'predicated', 'sexp_processor', 'wrong', 'nokogiri', 'xpath', 'virtus'];
