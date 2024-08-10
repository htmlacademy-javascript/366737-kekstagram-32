

import {setOnFormSubmit, closeUserModal, showSuccessMessage, showErrorMessage} from './load-form.js';
import {showAlert, debounce} from './util.js';
import {getData, sendData} from './api.js';
import {renderPictures} from './thumbnail.js';
import {picturesOpenContainer} from './modal.js';
import {init as initFilter, getFilteredPictures} from './filter.js';

// асинхронное отправление данных
setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeUserModal();
    showSuccessMessage();
  } catch {
    showErrorMessage ();
  }
});

//функция для загрузки данных с сервера
try {
  const data = await getData();
  const debounceRenderPictures = debounce(renderPictures);
  initFilter(data,debounceRenderPictures);
  renderPictures(getFilteredPictures());
  picturesOpenContainer(data);
} catch {
  showAlert ();
}


