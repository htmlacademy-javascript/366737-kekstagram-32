
const COUNT_PICTURES = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
const currentFilter = Filter.DEFAULT;
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
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    callback(getFilteredPictures());
  });
};

const initFilter = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
};

export{initFilter, getFilteredPictures};

