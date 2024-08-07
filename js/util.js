
const ALERT_SHOW_TIME = 5000;

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

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

//функция показа ошибки спустя какое-то время
const showAlert = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

//Обработчик событий по нажатию клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

//Обработчик событий на клавишу Enter
const isEnterKey = (evt) => evt.key === 'Enter';


export {getRandomInteger, uniqueRandomInteger, createIdGenerator, getRandomElement, isEscapeKey, isEnterKey, showAlert, debounce};
