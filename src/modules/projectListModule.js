import { drawTaskList } from './contentModule';

const projectList = ['demoProjectOne', 'demoProjectTwo'];

let currentProject = 'default';
// check localStorage for a currentProject
if (localStorage.getItem('currentProject') !== null) currentProject = localStorage.getItem('currentProject');

function getProjectList() {
  return projectList;
}

function addToProjectList(project) {
  projectList.push(project);
}

function getCurrentProject() {
  return currentProject;
}

function setCurrentProject(newCurrentProject) {
  currentProject = newCurrentProject;
  localStorage.setItem('currentProject', newCurrentProject);
}

function clearProjectList() {
  const projectListContainer = document.querySelector(
    '#project-list-container',
  );

  while (projectListContainer.firstChild) {
    projectListContainer.removeChild(projectListContainer.firstChild);
  }
}

function drawProjectList() {
  clearProjectList();
  const projectListContainer = document.querySelector(
    '#project-list-container',
  );

  projectList.forEach((ele) => {
    const project = document.createElement('button');
    project.classList = 'hover:text-sky-700';
    project.textContent = ele;
    projectListContainer.appendChild(project);

    if (currentProject === ele) project.classList.add('underline');

    project.addEventListener('click', () => {
      setCurrentProject(ele);
      clearProjectList();
      drawProjectList();
      drawTaskList();
    });
  });

  // add event for the all projects button
  const allProjectsButton = document.querySelector('#all-projects-button');

  if (currentProject === 'default') allProjectsButton.classList.add('underline');
  if (currentProject !== 'default') allProjectsButton.classList.remove('underline');

  allProjectsButton.addEventListener('click', () => {
    setCurrentProject('default');
    clearProjectList();
    drawProjectList();
    drawTaskList();
  });
}

export {
  getProjectList,
  addToProjectList,
  getCurrentProject,
  setCurrentProject,
  drawProjectList,
};
