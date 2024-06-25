function stringLength(string, length){
  return (string.length <= length);
}

// Строка короче 20 символов
console.log('тест 1', stringLength('проверяемая строка', 20));
// Длина строки ровно 18 символов
console.log('тест 2', stringLength('проверяемая строка', 18));
// Строка длиннее 10 символов
console.log('тест 3', stringLength('проверяемая строка', 10));


function stringPalindrome(string) {
  let transformString = string.replaceAll(' ','');
  let newString = '';
  transformString = transformString.toLowerCase();

  for(let i = transformString.length - 1; i >= 0; i--) {
    newString += transformString.at(i);
  }

  return (transformString === newString) ? 'Это палиндром' : 'Это не палиндром';
}

// Строка является палиндромом
console.log('тест 1', stringPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log('тест 2', stringPalindrome('ДовОд')); // true
// Это не палиндром
console.log('тест 3', stringPalindrome('Кекс')); // false
// Это палиндром
console.log('тест 4', stringPalindrome('Лёша на полке клопа нашёл ')); // true
