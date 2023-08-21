import { drawTaskList } from './modules/contentModule';
import addDemoTask from './modules/demoTaskModule';
import { drawFilterList } from './modules/filterModule';
import { addEventsToFormButtons } from './modules/modalModule';
import { drawProjectList } from './modules/projectListModule';

addDemoTask();
drawTaskList();
drawFilterList();
drawProjectList();
addEventsToFormButtons();
