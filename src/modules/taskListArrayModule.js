const taskListArray = [];

function addToTaskList(object) {
  taskListArray.push(object);
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
