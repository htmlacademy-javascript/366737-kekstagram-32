// Функция для получения рандомного числа из переданного диапазона.
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Функция, чтобы рандомное число не повторялось.
const uniqueRandomInteger = (min, max) => {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min,max);
    // Проверка, чтобы вызовы функций не превышали максимальное количество
    if(previousValues.length >= (max - min + 1)) {
      return null;
    }
    // Проверка, что число есть в хранилище
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Обработчик событий по нажатию клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

//Обработчик событий на клавишу Enter
const isEnterKey = (evt) => evt.key === 'Enter';

export {getRandomInteger, uniqueRandomInteger, createIdGenerator, getRandomElement, isEscapeKey, isEnterKey};
