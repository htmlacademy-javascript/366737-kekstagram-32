import {setOnFormSubmit, closeUserModal} from './load-form.js';
import {showAlert} from './util.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {getData, sendData} from './api.js';
import {renderPictures} from './thumbnail.js';

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
  renderPictures(data);
} catch {
  showAlert ();
}
