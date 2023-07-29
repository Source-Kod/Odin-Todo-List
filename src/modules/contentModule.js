import { format } from 'date-fns';
import {
  filterArrayByDay,
  filterArrayByProjectName,
  filterArrayByWeek,
  getCurrentFilter,
} from './filterModule';
import { getCurrentProject } from './projectListModule';
import { getTaskList } from './taskListArrayModule';
import {
  getCurrentSort,
  sortByDueDate,
  sortByName,
  sortByPriority,
  sortByProject,
} from './sortingModule';

const contentContainer = document.getElementById('#content-container');

function createTaskList() {
  // project
  let currentTaskList = filterArrayByProjectName(
    getTaskList,
    getCurrentProject,
  );

  // filter
  if (getCurrentFilter === 'day') {
    currentTaskList = filterArrayByDay(
      currentTaskList,
      format(new Date(), 'yyyy-MM-dd'),
    );
  }
  if (getCurrentFilter === 'week') {
    currentTaskList = filterArrayByWeek(
      currentTaskList,
      format(new Date(), 'yyyy-MM-dd'),
    );
  }
  // sort
  if (getCurrentSort === 'name') currentTaskList = sortByName(currentTaskList);
  if (getCurrentSort === 'date') currentTaskList = sortByDueDate(currentTaskList);
  if (getCurrentSort === 'project') currentTaskList = sortByProject(currentTaskList);
  if (getCurrentSort === 'priority') currentTaskList = sortByPriority(currentTaskList);

  return currentTaskList;
}
