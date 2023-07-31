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

function createTaskList() {
  let currentTaskList = getTaskList();

  // project
  if (getCurrentProject !== 'default') {
    currentTaskList = filterArrayByProjectName(
      getTaskList(),
      getCurrentProject(),
    );
  }

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

function drawTaskList() {
  const contentContainer = document.querySelector('#content-container');

  createTaskList().forEach((ele) => {
    const task = document.createElement('div');
    // name
    const taskName = document.createElement('p');
    taskName.textContent = ele.title;

    task.appendChild(taskName);
    task.classList = 'flex gap-3';

    // description
    const taskDescription = document.createElement('p');
    taskDescription.textContent = ele.description;

    task.appendChild(taskDescription);

    // duedate
    const taskDueDate = document.createElement('p');
    taskDueDate.textContent = ele.duedate;

    task.appendChild(taskDueDate);

    // priority
    const taskPriority = document.createElement('p');
    taskPriority.textContent = ele.priority;

    task.appendChild(taskPriority);

    // project
    const taskProject = document.createElement('p');
    taskProject.textContent = ele.project;

    task.appendChild(taskProject);

    contentContainer.appendChild(task);
  });
}

export { drawTaskList };
