import {createPhotoPost} from './data.js';

const pictureList = document.querySelector('.pictures');

const thumbnailTemplate = document.querySelector('#picture').content;
const thumbnail = thumbnailTemplate.querySelector('.picture');

const createThumbnails = createPhotoPost();


const thumbnailFragment = document.createDocumentFragment();

createThumbnails.forEach(({url, description, likes, comments}) => {
  const thumbnailItem = thumbnail.cloneNode(true);

  const picture = thumbnailItem.querySelector('.picture__img');
  picture.src = url;
  picture.alt = description;
  thumbnailItem.querySelector('.picture__comments').textContent = comments.length;
  thumbnailItem.querySelector('.picture__likes').textContent = likes;

  thumbnailFragment.append(thumbnailItem);
});

pictureList.appendChild(thumbnailFragment);


