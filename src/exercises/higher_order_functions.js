const names = ['Alex', 'Vladimir', 'Vladyk'];

const fixedNames = [];

for (let i = 0; i > names.length; i += 1) {
  let fixedName = `Mr, ${names[i]}`;
  fixedNames.push(fixedName);
}

const users = [
  { name: 'Alex', age: 34 },
  { name: 'John', age: 30 },
  { name: 'Vlad', age: 18 },
];

// фильтрация

const oldUsers = [];

for (let i = 0; i < users.length; i += 1) {
  const currentUser = users[i];
  console.log(currentUser);
  if (currentUser.age > 25) {
    console.log(currentUser.age);
    oldUsers.push(currentUser);
  }
}

console.log(oldUsers);

// суммирование

const usersSalary = [
  { name: 'Alex', age: 34, salary: 1000 },
  { name: 'John', age: 30, salary: 2000 },
  { name: 'Vlad', age: 18, salary: 3000 },
];

let salariesSum = 0;

for (let i = 0; i < usersSalary.length; i += 1) {
  const currentUser = usersSalary[i];
  salariesSum += currentUser.salary;
}

console.log(salariesSum);

const cb = (item) => {
  return `Mr, ${item}`;
};

const cb2 = (item) => {
  return item.length;
};

const myMap = (arr, cb) => {
  let result = [];

  for (let i = 0; i < arr.length; i += 1) {
    let currentUser = arr[i];
    let newViewForItem = cb(currentUser);
    result.push(newViewForItem);
  }

  return result;
};

console.log(myMap(names, cb));
console.log(myMap(names, cb2));

const newMap = names.map((item) => {
  return `Hey, ${item}`;
});

console.log(newMap);

Array.prototype.myMap = function (cb) {
  let result = [];

  for (let i = 0; i < this.length; i += 1) {
    let currentItem = this[i];
    let newViewForItem = cb(currentItem);
    result.push(newViewForItem);
  }
  return result;
};

console.log(names.myMap(cb));

const users2 = [
  { name: 'Kysia', age: 34 },
  { name: 'Pusia', age: 30 },
  { name: 'Opachki', age: 18 },
];

console.log(users2.filter((item) => item.age > 25));

Array.prototype.myFilter = function (cb) {
  let result = [];

  for (let i = 0; i < this.length; i += 1) {
    let currentItem = this[i];
    let isItemToStay = cb(currentItem);
    if (isItemToStay) {
      result.push(currentItem);
    }
  }
  return result;
};

console.log(users2.myFilter((item) => item.age > 25));

const result = users2.reduce((acc, currentValue) => {
  return (acc += currentValue.age);
}, 0);

console.log(result);

Array.prototype.myReduce = function (cb, initialAccumulator) {
  let acc = initialAccumulator;

  for (let i = 0; i < this.length; i += 1) {
    acc = cb(acc, this[i]);
  }
  return acc;
};

console.log(
  users2.myReduce((acc, currentValue) => (acc += currentValue.age), 0),
);
