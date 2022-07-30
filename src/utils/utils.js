const ACTIONS = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

const addZero = (num) => {
  if (Number.isNaN(parseInt(num, 10))) return '00';

  if (num < 10) return `0${num}`;

  return num;
};

const secondsToString = (seconds) => {
  const hours = addZero(parseInt(seconds / 3600, 10));
  const minutes = addZero(parseInt((seconds / 60) % 60, 10));
  const second = addZero(parseInt(seconds % 60, 10));

  const timeWithHours = `${hours}:${minutes}:${second}`;
  const timeWithoutHours = `${minutes}:${second}`;

  return hours === '00' ? timeWithoutHours : timeWithHours;
};

const timeToSeconds = (minutes, seconds) => {
  let min = parseInt(minutes, 10);
  let sec = parseInt(seconds, 10);

  if (Number.isNaN(parseInt(minutes, 10))) min = 0;
  if (Number.isNaN(parseInt(seconds, 10))) sec = 0;

  return min * 60 + sec;
};
export { ACTIONS, secondsToString, timeToSeconds };
