import {createPhotoPosts} from './data.js';

const pictureList = document.querySelector('.pictures');

const thumbnailTemplate = document.querySelector('#picture').content;
const thumbnail = thumbnailTemplate.querySelector('.picture');


const thumbnailFragment = document.createDocumentFragment();

createPhotoPosts.forEach(({url, description, likes, comments, id}) => {
  const thumbnailItem = thumbnail.cloneNode(true);

  const picture = thumbnailItem.querySelector('.picture__img');
  picture.src = url;
  picture.alt = description;
  thumbnailItem.querySelector('.picture__comments').textContent = comments.length;
  thumbnailItem.querySelector('.picture__likes').textContent = likes;
  thumbnailItem.setAttribute('data-id', id);

  thumbnailFragment.appendChild(thumbnailItem);
});

pictureList.appendChild(thumbnailFragment);


export {createPhotoPosts};


