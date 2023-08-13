import { drawTaskList } from './modules/contentModule';
import addDemoTask from './modules/demoTaskModule';
import { addEventsToFormButtons } from './modules/modalModule';
import { drawProjectList } from './modules/projectListModule';

addDemoTask();
drawTaskList();
drawProjectList();
addEventsToFormButtons();
