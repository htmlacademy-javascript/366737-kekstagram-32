import {isEscapeKey} from './util.js';
import {pristine} from './validation-form.js';
import {init, reset} from './effect-image.js';

init();

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...'
};
const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlayInput = form.querySelector('.img-upload__overlay');
const closeInput = form.querySelector('.img-upload__cancel');
const imageLoadPreview = document.querySelector('.img-upload__preview img');
const effectsImage = document.querySelectorAll('.effects__preview');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

//константа для сбрасывания изображения при закрытии окна
const scaleInput = document.querySelector('.scale__control--value');

const isErrorMessageShown = () =>Boolean(document.querySelector('.error'));

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // Предотвращает закрытие формы, если фокус на поле ввода
    if(document.activeElement !== textHashtags && document.activeElement !== textDescription && document.activeElement !== isErrorMessageShown) {
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

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled; // Устанавливаем состояние кнопки (активна/неактивна)
  submitButton.textContent = isDisabled
    ? SubmitButtonText.SUBMITTING //Если кнопка отключена, меняем текст на "Отправка..."
    : SubmitButtonText.IDLE; //Если кнопка активна, меняем текст на "Ожидание"
};

// асинхронная отправка формы
const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(form));
      toggleSubmitButton();
    }
  });
};

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
  imageLoadPreview.src = '';
  form.reset();

  // сбрасываем значения в pristine
  pristine.reset();

  // сбрасываем при закрытии окна размер изображения
  scaleInput.value = 100;
  imageLoadPreview.style.transform = 'scale(1)';

  //сбрасываем фильтры
  reset();
}


export {setOnFormSubmit, closeUserModal};
