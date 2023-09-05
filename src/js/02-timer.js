import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Функція додавання нуля перед числами менше 10
function addLeadingZero(value) {
  if (value < 10) {
    return `0${value}`;
  } else {
    return value.toString();
  }
}

// Функція для конвертації мілісекунд в дні, години, хвилини та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Отримання елементів інтерфейсу
const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Змінна для зберігання інтервалу таймера
let timerInterval;

// Функція оновлення таймера
function updateTimer() {
  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Ініціалізація flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    const currentDate = new Date();
    const timeDifference = selectedDate - currentDate;

    if (timeDifference <= 0) {
      alert('Please choose a date in the future');
      startButton.setAttribute('disabled', 'disabled');
    } else {
      startButton.removeAttribute('disabled');
    }
  },
});

// Обробник події для кнопки Start
startButton.addEventListener('click', () => {
  clearInterval(timerInterval);

  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    alert('Please choose a date in the future');
    return;
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});
