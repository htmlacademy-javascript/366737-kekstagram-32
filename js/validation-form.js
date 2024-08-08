const COUNT_HASHTAG = 5;

const uploadForm = document.querySelector('.img-upload__form');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: '.img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});


const validateHashtag = (value) => {
  if (value === ''){
    return true;
  }
  const hashtagArray = value.trim().split(' ').filter(Boolean);
  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtagArray.every((tag) => hashtag.test(tag));

};

const countHashtag = (value) => {
  const hashtagArray = value.trim().split(' ').filter(Boolean);
  return hashtagArray.length <= COUNT_HASHTAG;
};

const uniqueTags = (value) => {
  const hashtagArray = value.trim().split(' ').filter(Boolean);
  const lowerCaseTags = hashtagArray.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const lengthComment = (value) => value.length < 140;

pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtag, 'Невалидный хэш-теги', 1, true);
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), countHashtag, 'Нельзя использовать больше 5 хэш-тегов', 2, true);
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), uniqueTags, 'Данный хэш-тег уже был использован',3,true);

pristine.addValidator(uploadForm.querySelector('.text__description'), lengthComment, 'Длина комментария больше 140 символов');

export{pristine};

