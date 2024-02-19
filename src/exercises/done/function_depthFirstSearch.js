function depthFirstSearch(graph) {
  const visited = {};
  const keys = Object.keys(graph);
  const start = keys[0];
  const path = [];

  function dfs(node) {
    visited[node] = true;
    path.push(node);

    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }

  dfs(start);

  return path;
}

const deps1 = {
  wrong: ['predicated', 'sexp_processor'],
  xpath: ['nokogiri'],
  predicated: ['htmlentities'],
  sexp_processor: ['path'],
  nokogiri: ['wrong'],
  virtus: ['trast'],
};

const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D', 'E'],
  D: ['B', 'C', 'E'],
  E: ['C', 'D', 'F'],
  F: ['F'],
};
const result = depthFirstSearch(deps1);
console.log(result);
