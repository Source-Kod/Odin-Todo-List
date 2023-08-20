import { addToTaskList, createNewTask } from './taskListArrayModule';

export default function addDemoTask() {
  addToTaskList(
    createNewTask(
      'Read',
      'read a book',
      '2023-07-24',
      3,
      'demoProjectOne',
      true,
    ),
  );

  addToTaskList(
    createNewTask(
      'Groceries',
      'buy fruits and vegetables',
      '2023-08-23',
      1,
      'demoProjectOne',
      true,
    ),
  );

  addToTaskList(
    createNewTask(
      'Cleaning',
      'vacuum the living room',
      '2023-08-30',
      3,
      'demoProjectOne',
      false,
    ),
  );

  addToTaskList(
    createNewTask(
      'Meeting',
      'attend project status meeting',
      '2023-08-28',
      2,
      'demoProjectTwo',
      false,
    ),
  );

  addToTaskList(
    createNewTask(
      'Appointment',
      'visit the dentist',
      '2023-08-28',
      3,
      'demoProjectTwo',
      true,
    ),
  );
}
