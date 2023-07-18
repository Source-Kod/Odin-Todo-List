import { isSameDay, isSameWeek, parseISO } from 'date-fns';

function filterArrayByDay(array, date) {
  return array.filter((ele) => isSameDay(parseISO(ele.duedate), parseISO(date)));
}

function filterArrayByWeek(array, date) {
  return array.filter((ele) => isSameWeek(parseISO(ele.duedate), parseISO(date)));
}

function filterArrayByProjectName(array, projectName) {
  return array.filter((ele) => ele.project === projectName);
}

export { filterArrayByDay, filterArrayByWeek, filterArrayByProjectName };
