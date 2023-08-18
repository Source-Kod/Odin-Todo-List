import { getProjectList } from './projectListModule';

const body = document.querySelector('body');

function createNewTaskModal() {
  const modal = document.createElement('dialog');
  //
  // title
  const titleLabel = document.createElement('label');
  const titleTextArea = document.createElement('input');
  titleLabel.textContent = 'Title';
  modal.appendChild(titleLabel);
  modal.appendChild(titleTextArea);

  // Description
  const descriptionLabel = document.createElement('label');
  const descriptionTextarea = document.createElement('textarea');
  descriptionLabel.textContent = 'Description:';
  modal.appendChild(descriptionLabel);
  modal.appendChild(descriptionTextarea);

  // Due Date
  const dueDateLabel = document.createElement('label');
  const dueDateInput = document.createElement('input');
  dueDateLabel.textContent = 'Due Date:';
  dueDateInput.setAttribute('type', 'date');
  modal.appendChild(dueDateLabel);
  modal.appendChild(dueDateInput);

  // Priority
  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Priority:';
  modal.appendChild(priorityLabel);

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
  modal.appendChild(radioButtonContainer);

  // Project
  const projectLabel = document.createElement('label');
  const projectSelect = document.createElement('select');
  projectLabel.textContent = 'Project:';
  modal.appendChild(projectLabel);
  modal.appendChild(projectSelect);

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
  modal.appendChild(completedCheckboxContainer);

  // cancel and submit buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.classList = 'flex gap-4';
  const cancelButton = document.createElement('button');
  const submitButton = document.createElement('button');
  cancelButton.classList = 'w-28 border-black border-2 rounded-full hover:bg-sky-700';
  submitButton.classList = 'w-28 border-black border-2 rounded-full hover:bg-sky-700';
  cancelButton.textContent = 'Cancel';
  submitButton.textContent = 'submit';

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(submitButton);
  modal.appendChild(buttonContainer);

  // append modal to body and set dialog to show
  body.appendChild(modal);
  modal.showModal();
  modal.classList = 'gradient-bg p-4 flex flex-col gap-2';
}

function createNewProjectModal() {}

function addEventsToFormButtons() {
  const newTaskButton = document.querySelector('#new-task-button');
  const newProjectButton = document.querySelector('#new-project-button');

  // newTaskButton.addEventListener('click', () => {
  //   createNewTaskModal();
  // });
  createNewTaskModal();
}

export { addEventsToFormButtons };
