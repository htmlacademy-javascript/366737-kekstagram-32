import { isEscapeKey } from './util.js';
import { pristine } from './validation-form.js';
import { init, reset } from './effect-image.js';
import { updateScale } from './scale-control.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...'
};

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlayInput = form.querySelector('.img-upload__overlay');
const closeInput = form.querySelector('.img-upload__cancel');
const imageLoadPreview = document.querySelector('.img-upload__preview img');
const effectsImage = document.querySelectorAll('.effects__item .effects__preview');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const minusSizeButton = form.querySelector('.scale__control--smaller');
const plusSizeButton = form.querySelector('.scale__control--bigger');

// Константа для сбрасывания изображения при закрытии окна
const scaleInput = document.querySelector('.scale__control--value');

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

init();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // Предотвращает закрытие формы, если фокус на поле ввода
    if (document.activeElement !== textHashtags && document.activeElement !== textDescription && !isErrorMessageShown()) {
      closeUserModal();
    }
  }
};

uploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();

  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const imageUrl = URL.createObjectURL(file);

    imageLoadPreview.src = imageUrl;

    effectsImage.forEach((itemEffect) => {
      itemEffect.style.backgroundImage = `url(${imageUrl})`;
    });
  }
  openUserModal();
});

function openUserModal() {
  document.body.classList.add('modal-open');
  overlayInput.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  closeInput.addEventListener('click', closeUserModal);

  minusSizeButton.addEventListener('click', (evt) => {
    updateScale(evt);
  });
  plusSizeButton.addEventListener('click', (evt) => {
    updateScale(evt);
  });
}

function closeUserModal() {
  document.body.classList.remove('modal-open');
  overlayInput.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeInput.removeEventListener('click', closeUserModal);

  // Сбрасываем данные формы
  imageLoadPreview.src = '';
  form.reset();

  // Сбрасываем значения в pristine
  pristine.reset();

  // Сбрасываем при закрытии окна размер изображения
  const currentScale = 100;
  scaleInput.value = `${currentScale}%`;
  imageLoadPreview.style.transform = 'scale(1)';

  // Сбрасываем фильтры
  reset();
}

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled; // Устанавливаем состояние кнопки (активна/неактивна)
  submitButton.textContent = isDisabled
    ? SubmitButtonText.SUBMITTING // Если кнопка отключена, меняем текст на "Отправляю..."
    : SubmitButtonText.IDLE; // Если кнопка активна, меняем текст на "Опубликовать"
};

// Асинхронная отправка формы
const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(form));
      toggleSubmitButton(false);
    }
  });
};


// Скрытие сообщений и удаление обработчиков
function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

function onDocumentKeydownMessage(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (errorMessage) { // Если есть сообщение об ошибке
      hideMessage(); // Удаляем сообщение об ошибке
      if (!document.querySelector('.img-upload__overlay').classList.contains('hidden')) { // Проверяем, открыто ли окно редактирования изображения
        document.addEventListener('keydown', onDocumentKeydown); // Если открыто, добавляем обработчик для закрытия окна редактирования по нажатию клавиши
      }
    }
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydownMessage);
  body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};


export {setOnFormSubmit, closeUserModal, onDocumentKeydown, showSuccessMessage, showErrorMessage};
