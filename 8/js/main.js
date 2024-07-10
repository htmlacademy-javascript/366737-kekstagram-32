const NAMES = [
  'Сергей',
  'Андрей',
  'Алиса',
  'Олег',
  'Марина',
  'Юля',
  'Наталья',
  'Ольга',
  'Кристина',
  'Иван',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Вид с высоты на пляж',
  'Направление, где находится пляж',
  'Вид с пляжа',
  'Моя любимая',
  'Даже еда отдыхает',
  'Увидел крутую тачку',
  'Легкий завтрак... Очень легкий',
  'Освежающий напиток',
  'Большая птица низко летит',
  'Интересное место хранения',
  'Защищают зелень от туристов',
  'Подъехало такси',
  'Легкий обед',
  'Котосуши',
  'Странная обувь',
  'Вид из иллюминатора',
  'Концерт',
  'Музей машин',
  'Чтобы в темноте не спотыкаться об углы',
  'Вечерний пейзаж',
  'Легкий ужин',
  'Закат',
  'Крабик вышел поздороваться',
  'Ночной движ',
  'Бегемот зовет туристов с ним поиграть',
];

// Функция для получения рандомного числа из переданного диапазона.
function getRandomInteger(min, max) {
  const LOWER = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const UPPER = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const RESULT = Math.random() * (UPPER - LOWER + 1) + LOWER;

  return Math.floor(RESULT);
}

// Функция, чтобы рандомное число не повторялось.
function uniqueRandomInteger(min, max) {
  const PREVIOUS_VALUES = [];

  return function() {
    let currentValue = getRandomInteger(min,max);
    // Проверка, чтобы вызовы функций не превышали максимальное количество
    if(PREVIOUS_VALUES.length >= (max - min + 1)) {
      console.error ('В диапазоне закончились числа');
      return null;
    }
    // Проверка, что число есть в хранилище
    while (PREVIOUS_VALUES.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    PREVIOUS_VALUES.push(currentValue);
    return currentValue;
  };
}

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const CREATE_PHOTO_COUNT = 25;

const generatePostId = createIdGenerator();
const generateCommentId = createIdGenerator();
//const uniquePhotoId = createIdGenerator(1, 25); Фотографии в порядке возрастания
const uniquePhotoId = uniqueRandomInteger(1, 25);


const getRandomElement = (elements) => {
  const uniqueIndex = uniqueRandomInteger(0, elements.length - 1)();
  return elements[uniqueIndex];
};

function createComment() {
  return{
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES),
  };
}

function createPhoto() {
  return{
    id: generatePostId(),
    url: `photos/${uniquePhotoId()}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };

}

const photoPost = Array.from({length: CREATE_PHOTO_COUNT}, createPhoto);
console.log(photoPost);


