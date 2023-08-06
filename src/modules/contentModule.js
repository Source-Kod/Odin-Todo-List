import { format } from 'date-fns';
import {
  filterArrayByDay,
  filterArrayByProjectName,
  filterArrayByWeek,
  getCurrentFilter,
} from './filterModule';
import { getCurrentProject } from './projectListModule';
import { changeTaskCompleted, getTaskList } from './taskListArrayModule';
import {
  getCurrentSort,
  sortByDueDate,
  sortByTitle,
  sortByPriority,
  sortByProject,
  setCurrentSort,
} from './sortingModule';

function clearContentContainer() {
  const contentContainer = document.querySelector('#content-container');
  while (contentContainer.firstChild) {
    contentContainer.removeChild(contentContainer.firstChild);
  }
}

function createTaskList() {
  let currentTaskList = getTaskList();

  // project
  if (getCurrentProject() !== 'default') {
    currentTaskList = filterArrayByProjectName(
      getTaskList(),
      getCurrentProject(),
    );
  }

  // filter
  if (getCurrentFilter() === 'day') {
    currentTaskList = filterArrayByDay(
      currentTaskList,
      format(new Date(), 'yyyy-MM-dd'),
    );
  }
  if (getCurrentFilter() === 'week') {
    currentTaskList = filterArrayByWeek(
      currentTaskList,
      format(new Date(), 'yyyy-MM-dd'),
    );
  }
  // sort
  if (getCurrentSort() === 'title') currentTaskList = sortByTitle(currentTaskList);
  if (getCurrentSort() === 'date') currentTaskList = sortByDueDate(currentTaskList);
  if (getCurrentSort() === 'project') currentTaskList = sortByProject(currentTaskList);
  if (getCurrentSort() === 'priority') currentTaskList = sortByPriority(currentTaskList);

  return currentTaskList;
}

function createSortBar() {
  const contentContainer = document.querySelector('#content-container');
  const sortBarContainer = document.createElement('div');
  sortBarContainer.classList = 'flex gap-3 p-2 ml-7';

  // title
  const sortbarTitle = document.createElement('p');
  sortbarTitle.textContent = 'Task Title';
  sortBarContainer.appendChild(sortbarTitle);
  sortbarTitle.classList = 'w-28';

  sortbarTitle.addEventListener('click', () => {
    setCurrentSort('title');
    drawTaskList();
  });

  // DueDate
  const sortBarDate = document.createElement('p');
  sortBarDate.textContent = 'Due Date';
  sortBarContainer.appendChild(sortBarDate);
  sortBarDate.classList = 'w-28';

  sortBarDate.addEventListener('click', () => {
    setCurrentSort('date');
    drawTaskList();
  });

  // priority
  const sortBarPriority = document.createElement('p');
  sortBarPriority.textContent = 'Priority';
  sortBarContainer.appendChild(sortBarPriority);
  sortBarPriority.classList = 'w-28';

  sortBarPriority.addEventListener('click', () => {
    setCurrentSort('priority');
    drawTaskList();
  });

  // project
  const sortBarProject = document.createElement('p');
  sortBarProject.textContent = 'Project';
  sortBarContainer.appendChild(sortBarProject);

  sortBarProject.addEventListener('click', () => {
    setCurrentSort('project');
    drawTaskList();
  });

  // underline which sort is currentsort
  if (getCurrentSort() === 'title') sortbarTitle.classList.add('underline');
  if (getCurrentSort() === 'date') sortBarDate.classList.add('underline');
  if (getCurrentSort() === 'priority') sortBarPriority.classList.add('underline');
  if (getCurrentSort() === 'project') sortBarProject.classList.add('underline');

  // add sortbar to the content container
  contentContainer.appendChild(sortBarContainer);
}

function drawTaskList() {
  clearContentContainer();
  createSortBar();

  const contentContainer = document.querySelector('#content-container');
  const taskContainer = document.createElement('div');

  createTaskList().forEach((ele, index) => {
    const task = document.createElement('div');
    task.classList = 'flex gap-3 border-stone-300 border-2 rounded p-2 items-center hover:border-sky-700';
    const taskExtend = document.createElement('div');

    taskExtend.classList = 'flex gap-2 ml-4';
    // completed checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = ele.completed;
    checkbox.classList = 'w-4';
    task.appendChild(checkbox);

    checkbox.addEventListener('change', () => {
      changeTaskCompleted(index);
    });

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
    const taskPriorityParentContainer = document.createElement('div');
    taskPriorityParentContainer.classList = 'w-28';

    if (ele.priority === 3) taskPriority.classList = 'ml-4 w-3 h-3 bg-red-700 rounded-full';
    if (ele.priority === 2) taskPriority.classList = 'ml-4 w-3 h-3 bg-yellow-500 rounded-full';
    if (ele.priority === 1) taskPriority.classList = 'ml-4 w-3 h-3 bg-blue-700 rounded-full';

    taskPriorityParentContainer.appendChild(taskPriority);
    task.appendChild(taskPriorityParentContainer);

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
