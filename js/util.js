
const ALERT_SHOW_TIME = 5000;


const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

//функция показа ошибки спустя какое-то время
const showAlert = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


//Обработчик событий по нажатию клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

//Обработчик событий на клавишу Enter
const isEnterKey = (evt) => evt.key === 'Enter';


export {isEscapeKey, isEnterKey, showAlert, debounce};
