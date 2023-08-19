import { drawTaskList } from './contentModule';
import {
  addToProjectList,
  drawProjectList,
  getProjectList,
} from './projectListModule';
import { addToTaskList, createNewTask } from './taskListArrayModule';

const modalContainer = document.querySelector('#modal-container');

function clearModalContainer() {
  while (modalContainer.firstChild) {
    modalContainer.removeChild(modalContainer.firstChild);
  }
}

function createNewTaskModal() {
  const modalDialog = document.createElement('dialog');
  const modalForm = document.createElement('form');
  // title
  const titleLabel = document.createElement('label');
  const titleTextArea = document.createElement('input');
  titleTextArea.required = true;
  titleLabel.textContent = 'Title';
  modalForm.appendChild(titleLabel);
  modalForm.appendChild(titleTextArea);

  // Description
  const descriptionLabel = document.createElement('label');
  const descriptionTextarea = document.createElement('textarea');
  descriptionLabel.textContent = 'Description:';
  modalForm.appendChild(descriptionLabel);
  modalForm.appendChild(descriptionTextarea);

  // Due Date
  const dueDateLabel = document.createElement('label');
  const dueDateInput = document.createElement('input');
  dueDateLabel.textContent = 'Due Date:';
  dueDateInput.type = 'date';
  dueDateInput.required = 'true';
  modalForm.appendChild(dueDateLabel);
  modalForm.appendChild(dueDateInput);

  // Priority
  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Priority:';
  modalForm.appendChild(priorityLabel);

  const radioButtonContainer = document.createElement('div');
  radioButtonContainer.classList = 'flex gap-3';
  const priorityOptions = ['High', 'Medium', 'Low'];
  priorityOptions.forEach((optionText, index) => {
    const optionLabel = document.createElement('label');
    const optionRadio = document.createElement('input');
    optionLabel.textContent = optionText;
    optionRadio.setAttribute('type', 'radio');
    optionRadio.setAttribute('name', 'priority');
    optionRadio.setAttribute('value', optionText.toLowerCase());

    // Check the "Low" priority radio button
    if (index === 1) {
      optionRadio.setAttribute('checked', 'checked');
    }

    radioButtonContainer.appendChild(optionLabel);
    radioButtonContainer.appendChild(optionRadio);
  });
  modalForm.appendChild(radioButtonContainer);

  // Project
  const projectLabel = document.createElement('label');
  const projectSelect = document.createElement('select');
  projectLabel.textContent = 'Project:';
  modalForm.appendChild(projectLabel);
  modalForm.appendChild(projectSelect);

  const projects = getProjectList();
  projects.forEach((projectName) => {
    const projectOption = document.createElement('option');
    projectOption.textContent = projectName;
    projectOption.setAttribute('value', projectName.toLowerCase());
    projectSelect.appendChild(projectOption);
  });

  // Completed Checkbox
  const completedCheckboxContainer = document.createElement('div');
  completedCheckboxContainer.classList = 'flex gap-4';
  const completedLabel = document.createElement('label');
  const completedCheckbox = document.createElement('input');
  completedLabel.textContent = 'Completed:';
  completedCheckbox.setAttribute('type', 'checkbox');
  completedCheckboxContainer.appendChild(completedLabel);
  completedCheckboxContainer.appendChild(completedCheckbox);
  modalForm.appendChild(completedCheckboxContainer);

  // cancel and submit buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.classList = 'flex gap-4';
  const cancelButton = document.createElement('button');
  const submitButton = document.createElement('button');
  cancelButton.classList = 'w-28 border-black border-2 rounded-full hover:bg-sky-700';
  submitButton.classList = 'w-28 border-black border-2 rounded-full hover:bg-sky-700';
  cancelButton.textContent = 'Cancel';
  submitButton.textContent = 'submit';
  submitButton.type = 'submit';

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(submitButton);
  modalForm.appendChild(buttonContainer);

  cancelButton.addEventListener('click', () => {
    clearModalContainer();
    modalDialog.close();
  });

  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // figure out which radio button is selected and set its value as selectedPriority
    const priorityRadios = document.querySelectorAll('input[name="priority"]');

    let selectedPriority = null;

    priorityRadios.forEach((radio) => {
      if (radio.checked) selectedPriority = radio.value;
    });
    // change selectedPriority's value to 1,2,3 that is used by contentModule function
    if (selectedPriority === 'low') selectedPriority = 1;
    if (selectedPriority === 'medium') selectedPriority = 2;
    if (selectedPriority === 'high') selectedPriority = 3;

    // use the form values to create a new task
    addToTaskList(
      createNewTask(
        titleTextArea.value,
        descriptionTextarea.value,
        dueDateInput.value,
        selectedPriority,
        projectSelect.value,
        completedCheckbox.checked,
      ),
    );

    clearModalContainer();
    modalDialog.close();
    drawTaskList();
  });

  // append modal to modal-container and set dialog to show
  modalDialog.appendChild(modalForm);
  modalContainer.appendChild(modalDialog);
  modalDialog.showModal();
  modalDialog.classList = 'gradient-bg p-4 rounded-lg';
  modalForm.classList = 'flex flex-col gap-2';
}

function createNewProjectModal() {
  // createNewTaskModal();
  const modalDialog = document.createElement('dialog');
  const modalForm = document.createElement('form');

  // Project name
  const projectNameLabel = document.createElement('label');
  const projectNameTextArea = document.createElement('input');
  projectNameTextArea.required = true;
  projectNameLabel.textContent = 'Project name: ';
  modalForm.appendChild(projectNameLabel);
  modalForm.appendChild(projectNameTextArea);

  // concel and submit buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.classList = 'flex gap-4';
  const cancelButton = document.createElement('button');
  const submitButton = document.createElement('button');
  cancelButton.classList = 'w-28 border-black border-2 rounded-full hover:bg-sky-700';
  submitButton.classList = 'w-28 border-black border-2 rounded-full hover:bg-sky-700';
  cancelButton.textContent = 'Cancel';
  submitButton.textContent = 'submit';
  submitButton.type = 'submit';

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(submitButton);
  modalForm.appendChild(buttonContainer);

  cancelButton.addEventListener('click', () => {
    clearModalContainer();
    modalDialog.close();
  });

  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    addToProjectList(projectNameTextArea.value);

    clearModalContainer();
    modalDialog.close();
    drawProjectList();
  });

  // append modal to modal-container and set dialog to show
  modalDialog.appendChild(modalForm);
  modalContainer.appendChild(modalDialog);
  modalDialog.showModal();
  modalDialog.classList = 'gradient-bg p-4 rounded-lg';
  modalForm.classList = 'flex flex-col gap-2';
}

function addEventsToFormButtons() {
  const newTaskButton = document.querySelector('#new-task-button');
  const newProjectButton = document.querySelector('#new-project-button');

  newTaskButton.addEventListener('click', () => {
    createNewTaskModal();
  });

  newProjectButton.addEventListener('click', () => {
    createNewProjectModal();
  });
}

export { addEventsToFormButtons };
