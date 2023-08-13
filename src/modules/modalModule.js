const body = document.querySelector('body');

function createModal() {
  const modal = document.createElement('dialog');
  const filler = document.createElement('p');

  filler.textContent = 'fjeshfgjsaghfhjklhsajkgsrjkhgasrkjl';
  modal.appendChild(filler);
  body.appendChild(modal);
  modal.showModal();
  modal.classList = 'gradient-bg';
}

function addEventsToFormButtons() {
  const newTaskButton = document.querySelector('#new-task-button');
  const newProjectButton = document.querySelector('#new-project-button');

  newTaskButton.addEventListener('click', () => {
    createModal();
  });
}

export { addEventsToFormButtons };
