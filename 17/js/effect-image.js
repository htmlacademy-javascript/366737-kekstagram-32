const effectName = { //Effect
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [effectName.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [effectName.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [effectName.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [effectName.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [effectName.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [effectName.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effectName.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effectName.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effectName.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effectName.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [effectName.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const effectValue = document.querySelector('.effect-level__value');
const imageLoadPreview = document.querySelector('.img-upload__preview img');
const effectContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectsElement = document.querySelector('.effects');

let chosenEffect = effectName.DEFAULT;
const isDefault = () => chosenEffect === effectName.DEFAULT;


// выбранный эффект применяем к изображению
const setImageStyle = () => {
  if (isDefault()) {
    imageLoadPreview.style.filter = null;
    return;
  }

  const {value} = effectValue;
  const{style, unit} = effectToFilter[chosenEffect];
  imageLoadPreview.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  effectContainer.classList.remove('hidden');
};

const hideSlider = () => {
  effectContainer.classList.add('hidden');
};

// обновляем эффект при изменение слайдера
const onSliderUpdate = () => {
  effectValue.value = effectSlider.noUiSlider.get();
  setImageStyle();
};

// создаем слайдер
const createSlider = ({min, max, step}) => {
  noUiSlider.create(effectSlider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  effectSlider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

//обновляем настройки слайдера
const updateSlider = ({min, max, step}) => {
  effectSlider.noUiSlider.updateOptions({
    range: {min, max},
    step,
    start: max,
  });
};

//отображение и обновление слайдера
const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

// устанавливаем выбранный эффект
const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(effectName.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectsChange);
};

export {init, reset};


