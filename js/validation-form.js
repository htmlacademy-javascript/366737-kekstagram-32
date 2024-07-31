import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: '.img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});


const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagArray = (tagString) => tagString.trim().split(' ').filter(() => Boolean.length);
const sameHashtag = (value) => hashtagArray(value).every((tag) => hashtag.test(tag));

const countHashtag = (value) => hashtagArray(value).length <= 5;

const uniqueTags = (value) => {
  const lowerCaseTags = hashtagArray(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const lengthComment = (value) => value.length < 140;

pristine.addValidator(uploadForm.querySelector('.text__hashtags'), sameHashtag, 'Невалидный хэш-теги', 3, true);
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), countHashtag, 'Нельзя использовать больше 5 хэш-тегов', 1, true);
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), uniqueTags, 'Данный хэш-тег уже был использован',2,true);

pristine.addValidator(uploadForm.querySelector('.text__description'), lengthComment, 'Длина комментария больше 140 символов');

export{pristine};


/*
textHashtags.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation(); // Предотвращает закрытие формы, если фокус на поле ввода
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation(); // Предотвращает закрытие формы, если фокус на поле ввода
  }
});
*/
