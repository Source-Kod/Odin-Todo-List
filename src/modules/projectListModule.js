import { drawTaskList } from './contentModule';

const projectList = ['default', 'projectA'];

let currentProject = 'default';

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
  const projectListContainer = document.querySelector(
    '#project-list-container',
  );

  projectList.forEach((ele) => {
    const project = document.createElement('p');
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
}

export {
  getProjectList,
  addToProjectList,
  getCurrentProject,
  setCurrentProject,
  drawProjectList,
};
