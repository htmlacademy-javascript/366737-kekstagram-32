const MIN_SIZE = 25;
const MAX_SIZE = 100;
const SIZE_STEP = 25;

const scaleInput = document.querySelector('.scale__control--value');
const scaleDecrease = document.querySelector('.scale__control--smaller');
const scaleIncrease = document.querySelector('.scale__control--bigger');
const imageLoadPreview = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SIZE;

scaleDecrease.addEventListener('click', () => {
  currentScale = Math.max(currentScale - SIZE_STEP, MIN_SIZE);
  updateScale();
});

scaleIncrease.addEventListener('click', () => {
  currentScale = Math.min(currentScale + SIZE_STEP, MAX_SIZE);
  updateScale();
});

function updateScale() {
  scaleInput.value = `${currentScale}%`;
  imageLoadPreview.style.transform = `scale(${currentScale / 100})`;
}

export {updateScale};
