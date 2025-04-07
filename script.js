const taskInput = document.querySelector('.input');
const addButton = document.querySelector('.btn-add');
const deleteBtn = document.querySelector('.btn-delete');
const clearBtn = document.querySelector('.btn-clear');
const taskList = document.querySelector('.task-list');
const tasks = taskList.querySelector('li');

const inputTask = () => {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
};

const createButton = () => {
  const button = document.createElement('button');
  button.classList.add('btn-delete');
  button.textContent = 'X';

  return button;
};

const addTask = (taskText, done = false) => {
  renderTask(taskText, done);

  // Add to Storage
  const tasks = getTasksFromStorage();
  tasks.push({ text: taskText, done });
  saveTasksToStorage(tasks);

  console.log(tasks);

  checkUI();
};

const saveTasksToStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTasksFromStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

// Render to DOM
const renderTask = (taskText, done = false) => {
  const li = document.createElement('li');
  li.classList.add('task');
  li.textContent = taskText;
  if (done) li.classList.add('done');

  const button = createButton();
  li.appendChild(button);

  taskList.appendChild(li);
};

const loadTasks = () => {
  const tasks = getTasksFromStorage();
  tasks.forEach((task) => {
    renderTask(task.text, task.done);
  });

  checkUI();
};

const onClickTask = (e) => {
  // Remove tasks from DOM
  if (e.target.classList.contains('btn-delete')) {
    const li = e.target.parentElement;
    const taskText = li.firstChild.textContent.trim();
    li.remove();
    removeTaskFromStorage(taskText);
    // e.target.parentElement.remove();
  } else if (e.target.classList.contains('task')) {
    e.target.classList.toggle('done');
    const taskText = e.target.childNodes[0].textContent.trim();
    toggleTaskStatusInStorage(taskText);
  }

  checkUI();
};

const toggleTaskStatusInStorage = (taskText) => {
  const tasks = getTasksFromStorage();

  const updatedTasks = tasks.map((task) => {
    if (task.text === taskText) {
      return { ...task, done: !task.done };
    }
    return task;
  });

  saveTasksToStorage(updatedTasks);
};

const removeTaskFromStorage = (taskText) => {
  const tasks = getTasksFromStorage();
  const updatedTasks = tasks.filter((task) => task.text !== taskText);
  saveTasksToStorage(updatedTasks);
};

const clearTasks = () => {
  const tasks = taskList.querySelectorAll('li');

  if (confirm('Are you sure?')) {
    tasks.forEach((task) => task.remove());
    localStorage.removeItem('tasks');
  }

  checkUI();
};

const checkUI = () => {
  const tasks = taskList.querySelectorAll('li');
  const pendingTask = document.querySelector('.pending-task');
  const pendingTasks = Array.from(tasks).filter(
    (task) => !task.classList.contains('done')
  );

  pendingTask.textContent = `You have ${pendingTasks.length} pending tasks`;

  clearBtn.style.display = tasks.length ? 'block' : 'none';
};

checkUI();

// Event Listeners
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    inputTask();
  }
});
addButton.addEventListener('click', inputTask);
taskList.addEventListener('click', onClickTask);
clearBtn.addEventListener('click', clearTasks);
document.addEventListener('DOMContentLoaded', loadTasks);
