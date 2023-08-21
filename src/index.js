import { drawTaskList } from './modules/contentModule';
import addDemoTask from './modules/demoTaskModule';
import { drawFilterList } from './modules/filterModule';
import { addEventsToFormButtons } from './modules/modalModule';
import { drawProjectList } from './modules/projectListModule';

if (localStorage.getItem('haveMadeDemoTask') !== 'True') {
  addDemoTask();
  localStorage.setItem('haveMadeDemoTask', 'True');
}

drawTaskList();
drawFilterList();
drawProjectList();
addEventsToFormButtons();
