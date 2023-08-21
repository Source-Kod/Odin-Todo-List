let taskListArray = [];
// check localStorage for taskListArray
if (localStorage.getItem('taskListArray') !== null) taskListArray = JSON.parse(localStorage.getItem('taskListArray'));

function addToTaskList(object) {
  taskListArray.push(object);
  localStorage.setItem('taskListArray', JSON.stringify(taskListArray));
}

function getTaskList() {
  return taskListArray;
}

function createNewTask(
  title,
  description,
  duedate,
  priority,
  project,
  completed,
) {
  return {
    title,
    description,
    duedate,
    priority,
    project,
    completed,
  };
}

function changeTaskCompleted(index) {
  taskListArray[index].completed = !taskListArray[index].completed;
}

export {
  addToTaskList, getTaskList, createNewTask, changeTaskCompleted,
};
