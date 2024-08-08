
const COUNT_PICTURES = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const postContainer = document.querySelector('.pictures');
const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

//сортировка по количеству комментариев
const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

// функция с фильтрами
const getFilteredPictures = () => {
  switch(currentFilter) {
    case Filter.RANDOM:
      return[...pictures].sort(sortRandomly).slice(0, COUNT_PICTURES);
    case Filter.DISCUSSED:
      return[...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

//обработчик фильтра по клику
const setOnFilterClick = (callback) => {
  // Добавляем обработчик события клика на элементе filterElement
  filterElement.addEventListener('click', (evt) => {
    // Проверяем, был ли клик на кнопке фильтра
    if (!evt.target.classList.contains('img-filters__button')) {
      return; // Если клик не на кнопке фильтра, выходим из функции
    }

    const clickedButton = evt.target; // Сохраняем нажатую кнопку
    if (clickedButton.id === currentFilter) {
      return; // Если нажали на текущий фильтр, выходим из функции
    }

    // Убираем активный класс с текущей кнопки
    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');

    // Добавляем активный класс на нажатую кнопку
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id; // Обновляем текущий фильтр

    // Удаляем все элементы с классом 'picture' из контейнера постов
    while (document.querySelector('.picture')) {
      postContainer.removeChild(document.querySelector('.picture'));
    }

    // Вызываем функцию обратного вызова с фильтрованными изображениями
    callback(getFilteredPictures());
  });
};

const initFilter = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
};

export{initFilter, getFilteredPictures};

