import { isSameDay, isSameWeek, parseISO } from 'date-fns';
import { drawTaskList } from './contentModule';

// options are none, day, week
let currentFilter = 'none';

// check localStorage for a currentFilter
if (localStorage.getItem('currentFilter') !== null) currentFilter = localStorage.getItem('currentFilter');

const filterListContainer = document.querySelector('#filter-list-container');

function getCurrentFilter() {
  return currentFilter;
}

function setCurrentFilter(newCurrentFilter) {
  currentFilter = newCurrentFilter;
  localStorage.setItem('currentFilter', newCurrentFilter);
}

function filterArrayByDay(array, date) {
  return array.filter((ele) => isSameDay(parseISO(ele.duedate), parseISO(date)));
}

function filterArrayByWeek(array, date) {
  return array.filter((ele) => isSameWeek(parseISO(ele.duedate), parseISO(date)));
}

function filterArrayByProjectName(array, projectName) {
  return array.filter((ele) => ele.project === projectName);
}

function clearFilterContainer() {
  while (filterListContainer.firstChild) {
    filterListContainer.removeChild(filterListContainer.firstChild);
  }
}

function drawFilterList() {
  clearFilterContainer();

  const noneFilter = document.createElement('button');
  const dayFilter = document.createElement('button');
  const weekFilter = document.createElement('button');

  filterListContainer.appendChild(noneFilter);
  filterListContainer.appendChild(dayFilter);
  filterListContainer.appendChild(weekFilter);

  noneFilter.textContent = 'None';
  dayFilter.textContent = 'day';
  weekFilter.textContent = 'Week';

  noneFilter.classList = 'hover:text-sky-700';
  dayFilter.classList = 'hover:text-sky-700';
  weekFilter.classList = 'hover:text-sky-700';

  if (currentFilter === 'none') noneFilter.classList.add('underline');
  if (currentFilter === 'day') dayFilter.classList.add('underline');
  if (currentFilter === 'week') weekFilter.classList.add('underline');

  noneFilter.addEventListener('click', () => {
    setCurrentFilter('none');
    drawFilterList();
    drawTaskList();
  });

  dayFilter.addEventListener('click', () => {
    setCurrentFilter('day');
    drawFilterList();
    drawTaskList();
  });

  weekFilter.addEventListener('click', () => {
    setCurrentFilter('week');
    drawFilterList();
    drawTaskList();
  });
}

export {
  filterArrayByDay,
  filterArrayByWeek,
  filterArrayByProjectName,
  getCurrentFilter,
  setCurrentFilter,
  drawFilterList,
};
