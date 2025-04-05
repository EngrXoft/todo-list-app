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
  const li = document.createElement('li');
  li.classList.add('task');
  li.textContent = taskText;

  const button = createButton();
  li.appendChild(button);

  // Add to DOM
  taskList.appendChild(li);

  // Add to Storage
  addTaskToStorage(taskText);

  checkUI();
};

const addTaskToStorage = (taskText) => {
    console.log(taskText);
}


const onClickTask = (e) => {
  // Remove tasks from DOM
  if (e.target.classList.contains('btn-delete')) {
    e.target.parentElement.remove();
  } else if (e.target.classList.contains('task')) {
    e.target.classList.toggle('done');
  }

  checkUI();
};

const clearTasks = () => {
  const tasks = taskList.querySelectorAll('li');

  if (confirm('Are you sure?')) {
    tasks.forEach((task) => task.remove());
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
