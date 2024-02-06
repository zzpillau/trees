// const obj = { key: { key2: 'anotherValue' }, key2: 'value2' };
// console.log(JSON.stringify(obj, null, ' '));
import _ from 'lodash';

// const stringify = (value, replacer = '!!', spacesCount = 1) => {
//   if (typeof value === 'object') {
//     console.log(typeof value === 'object');
//     // console.log(value);
//     const keys = Object.keys(value);

//     // console.log(keys);
//     const iter = (obj, arr, accum) => {
//       console.log(obj, accum);
//       arr.reduce((acc, key) => {
//         if (typeof value[key] !== 'object') {
//           console.log('acc before ===', acc);
//           console.log(key);
//           // console.log(value[key]);
//           // console.log(`${replacer}${key}: ${value[key]}`);
//           // acc = `${acc}{${replacer}${key}: ${value[key]}}`;
//           acc = `${acc}${replacer}${key}: ${value[key]}\n`;
//           console.log('acc after ====', acc);
//           return acc;
//         }
//         console.log('key ===', key);
//         acc = `${acc}${key}`;
//         console.log(acc);

//         return iter(value[key], keys, acc);
//       }, accum);

//       return iter(value, '');
//     };
//   }
//   return `${value}`;
// };

// const stringify = (value, replacer = ' ', spacesCount = 1) => {
//   const symbol = (r, s) => {
//     return r.repeat(s);
//   };

//   if (typeof value === 'object') {
//     const keys = Object.keys(value ?? 'null');
//     const reduce = keys.reduce((acc, key) => {
//       if (value[key] === null) {
//         value[key] = 'null';
//       }
//       if (typeof value[key] === 'object') {
//         acc = `${acc}${symbol(replacer, spacesCount)}${key}: ${stringify(
//           value[key],
//           symbol(replacer, spacesCount),
//           spacesCount,
//         )}\n${symbol(replacer, spacesCount)}`;

//         return acc;
//       }
//       console.log(spacesCount);
//       acc = `${acc}${symbol(replacer, spacesCount)}${key}: ${
//         value[key]
//       }\n${symbol(replacer, spacesCount)}`;

//       return acc;
//     }, '');
//     return `{\n${reduce}}`;
//   }
//   return `${value}`;
// };

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

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const replacerTool = (r, s) => {
    return r.repeat(s);
  };

  // задать n можно только итером
  const iter = (depth, ) => {
    if(n === )
    if (!typeof value === 'object') {
      return `${value}`;
    }
    const keys = Object.keys(value ?? 'null');
    if (n === keys.length) {
      return;
    }
    const reduce = keys.reduce((line, key) => {
      if (value[key] === null) {
        value[key] = 'null';
      }
      if (typeof value[key] === 'object') {
        line = `${line}${replacerTool(
          replacer,
          spacesCount,
        )}${key}: {\n${stringify(value[key], replacer, spacesCount)}\n`; //// str rec

        return line;
      }
      line = `${line}${replacerTool(replacer, spacesCount)}${key}: ${
        value[key]
      }\n`; //// str
      return line;
    }, '');
    return `${reduce}${replacerTool(replacer, spacesCount)}}`;
  };
  return iter(1);
};

console.log(stringify(nested, '|-'));

// ${replacer.repeat(spacesCount)}
// ${symbol(replacer, spacesCount)}

// const data = { hello: 'world', is: true, nested: { count: 5 } };

// console.log(stringify(data)); // то же самое что stringify(data, ' ', 1);

// console.log(stringify('hello')); // hello - значение приведено к строке, но не имеет кавычек

// console.log(stringify(true)); // true

// console.log(stringify(5)); // 5

// // {
// //  hello: world
// //  is: true
// //  nested: {
// //   count: 5
// //  }
// // }

// console.log(stringify(data, '%s', %s));
// // Символ, переданный вторым аргументом повторяется столько раз, сколько указано третьим аргументом.
// // {
// // |-|-hello: world
// // |-|-is: true
// // |-|-nested: {
// // |-|-|-|-count: 5
// // |-|-}
// // }
