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

export {
  getProjectList,
  addToProjectList,
  getCurrentProject,
  setCurrentProject,
};
