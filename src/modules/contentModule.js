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
  const taskContainer = document.createElement('div');

  createTaskList().forEach((ele) => {
    const task = document.createElement('div');
    task.classList = 'flex gap-3 border-stone-300 border-2 rounded p-2 items-center hover:border-sky-700';
    const taskExtend = document.createElement('div');
    taskExtend.classList = 'flex gap-2 ml-4';

    // name
    const taskName = document.createElement('p');
    taskName.textContent = ele.title;
    taskName.classList = 'w-28';

    task.appendChild(taskName);

    // duedate
    const taskDueDate = document.createElement('p');
    taskDueDate.textContent = ele.duedate;
    taskDueDate.classList = 'w-28';

    task.appendChild(taskDueDate);

    // priority
    const taskPriority = document.createElement('p');
    taskPriority.textContent = ele.priority;

    task.appendChild(taskPriority);

    // project
    const taskProject = document.createElement('p');
    taskProject.textContent = ele.project;

    task.appendChild(taskProject);

    // click to expand
    const clickToExpand = document.createElement('p');
    clickToExpand.textContent = 'Click for Description';
    clickToExpand.classList = 'ml-20 hover:text-sky-700';

    clickToExpand.addEventListener(
      'click',
      () => {
        const taskDescription = document.createElement('p');
        const descriptionLabel = document.createElement('p');

        descriptionLabel.textContent = 'Description:';
        taskDescription.textContent = ele.description;
        taskDescription.classList = '';

        taskExtend.appendChild(descriptionLabel);
        taskExtend.appendChild(taskDescription);
      },
      { once: true },
    );

    task.appendChild(clickToExpand);

    // attach task to taskcontainer
    taskContainer.appendChild(task);
    taskContainer.appendChild(taskExtend);
  });
  contentContainer.appendChild(taskContainer);
}

export { drawTaskList };
