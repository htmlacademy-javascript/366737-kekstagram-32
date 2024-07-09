function stringLength(string, length){
  return string.length <= length;
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

  return transformString === newString;
}

// Строка является палиндромом
console.log('тест 1', stringPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log('тест 2', stringPalindrome('ДовОд')); // true
// Это не палиндром
console.log('тест 3', stringPalindrome('Кекс')); // false
// Это палиндром
console.log('тест 4', stringPalindrome('Лёша на полке клопа нашёл ')); // true


//startWork - начало рабочего дня
//endWork - конец рабочего дня
//startMeeting - начало встречи
//durationMeeting - продолжительность встречи
/*
имяФункции('08:00', '17:30', '14:00', 90); // true
имяФункции('8:0', '10:0', '8:0', 120);     // true
имяФункции('08:00', '14:30', '14:00', 90); // false
имяФункции('14:00', '17:30', '08:0', 90);  // false
имяФункции('8:00', '17:30', '08:00', 900); // false
*/

// переводим время в минуты
const timeInMinutes = (time) => {
  const [hours, minutes] = time.split(':').map((num) => parseInt(num, 10));
  return hours * 60 + minutes;
};

const workEndMeeting = (startWork, endWork, startMeeting, durationMeeting) => {
  const startHoursMinutes = startWork.split(':');
  const endHoursMinutes = endWork.split(':');
  const removeZero = (number) => parseInt(number.toString().replace(/0+/g, ''), 10);
  const hourInMinutesWork = (removeZero((endHoursMinutes[0] - startHoursMinutes[0])) * 60);
  const minutesWork = parseInt(endHoursMinutes[1], 10) - parseInt(startHoursMinutes[1],10);
  const lengthWork = hourInMinutesWork + minutesWork; //Длина рабочего дня

  const hoursMinutesMeeting = startMeeting.split(':');
  const hoursInMinutesMeeting = 0;
  const minutesMeeting = parseInt(hoursMinutesMeeting[1], 10);
  const timeMeeting = hoursInMinutesMeeting + minutesMeeting + durationMeeting; // продолжительность встречи

  const workEndMeetingLength = timeInMinutes(endWork) - timeInMinutes(startMeeting); // выходит ли встреча за рабочее время

  if(startHoursMinutes[0] > hoursMinutesMeeting[0]){
    return false;
  } else if (workEndMeetingLength < durationMeeting) {
    return false;
  }else if (lengthWork >= timeMeeting) {
    return true;
  } else if(lengthWork < timeMeeting) {
    return false;
  }

};


console.log(workEndMeeting('08:00', '17:30', '14:00', 90)); // true
console.log(workEndMeeting('8:0', '10:0', '8:0', 120)); // true
console.log(workEndMeeting('08:00', '14:50', '14:00', 90)); // false
console.log(workEndMeeting('14:00', '17:30', '08:0', 90)); // false
console.log(workEndMeeting('8:00', '17:30', '08:00', 900)); //false

