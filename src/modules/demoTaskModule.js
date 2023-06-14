import { addToTaskList, createNewTask } from './taskListArrayModule';

export default function addDemoTask() {
  addToTaskList(
    createNewTask('read', 'read a book', '2023-05-24', 3, 'default', true),
  );

  addToTaskList(
    createNewTask(
      'groceries',
      'buy fruits and vegetables',
      '2023-05-23',
      1,
      'default',
      true,
    ),
  );

  addToTaskList(
    createNewTask(
      'cleaning',
      'vacuum the living room',
      '2023-04-30',
      3,
      'default',
      false,
    ),
  );

  addToTaskList(
    createNewTask(
      'meeting',
      'attend project status meeting',
      '2023-05-28',
      2,
      'default',
      false,
    ),
  );

  addToTaskList(
    createNewTask(
      'appointment',
      'visit the dentist',
      '2023-05-28',
      3,
      'projectA',
      true,
    ),
  );
}
