import {isEscapeKey} from './util.js';
import { pristine } from './validation-form.js';
import {reset} from './effect-image.js';

const uploadInput = document.querySelector('.img-upload__input');
const overlayInput = document.querySelector('.img-upload__overlay');
const closeInput = document.querySelector('.img-upload__cancel');
const imageLoadPreview = document.querySelector('.img-upload__preview img');
const effectsImage = document.querySelectorAll('.effects__preview');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const formInput = document.querySelector('.img-upload__form');

//константа для сбрасывания изображения при закрытии окна
const scaleInput = document.querySelector('.scale__control--value');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // Предотвращает закрытие формы, если фокус на поле ввода
    if(document.activeElement === textHashtags || document.activeElement === textDescription) {
      evt.stopPropagation();
    } else{
      closeUserModal();
    }
  }
};

uploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();

  const file = uploadInput.files[0];
  const imageUrl = URL.createObjectURL(file);

  imageLoadPreview.src = imageUrl;

  effectsImage.forEach((itemEffect) => {
    itemEffect.style.backgroundImage = `url(${imageUrl})`;
  });
  openUserModal();
});

function openUserModal () {
  overlayInput.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeInput.addEventListener('click', closeUserModal);
}

function closeUserModal () {
  overlayInput.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeInput.removeEventListener('click', closeUserModal);

  // сбрасываем данные формы
  formInput.reset();

  // сбрасываем значения в pristine
  pristine.reset();

  // сбрасываем при закрытии окна размер изображения
  scaleInput.value = 100;
  imageLoadPreview.style.transform = 'scale(1)';

  //сбрасываем фильтры
  reset();

}
