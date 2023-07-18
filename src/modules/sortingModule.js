import { compareAsc, parseISO } from 'date-fns';

function sortByName(array) {
  return array.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
}

function sortByDueDate(array) {
  return array.sort((a, b) => {
    const dateA = parseISO(a.duedate);
    const dateB = parseISO(b.duedate);
    return compareAsc(dateA, dateB);
  });
}

function sortByProject(array) {
  return array.sort((a, b) => {
    if (a.project < b.project) return -1;
    if (a.project > b.project) return 1;
    return 0;
  });
}

function sortByPriority(array) {
  return array.sort((a, b) => {
    const priorityA = a.priority;
    const priorityB = b.priority;

    if (priorityA < priorityB) return -1;
    if (priorityA > priorityB) return 1;
    return 0;
  });
}

export {
  sortByName, sortByDueDate, sortByPriority, sortByProject,
};
