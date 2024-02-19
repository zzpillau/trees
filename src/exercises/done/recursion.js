// рекурсия

function factorial(n) {
  if (n === 0) {
    return 1;
  }

  return n * factorial(n - 1);
}

console.log(factorial(3));

// итеративный процесс

const factorial2 = (n) => {
  if (n === 0) {
    return 1;
  }

  const iter = (counter, acc) => {
    if (counter === 1) {
      return acc;
    }
    console.log(counter, acc);

    return iter(counter - 1, counter * acc);
  };

  return iter(n, 1); // число, чей факториал, и начальное значение аккумулятора
};

console.log(factorial2(3));


