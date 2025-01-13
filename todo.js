// Toggle Dark/Light Theme
const toggleTheme = document.getElementById("theme-toggle");
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Modal Control
let currentColumn = null;
const taskModal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");

function openTaskModal(columnId) {
  currentColumn = columnId;
  taskModal.style.display = "flex";
  taskForm.reset();
}

function closeTaskModal() {
  taskModal.style.display = "none";
}

// Add Task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const column = document.getElementById(currentColumn).querySelector(".task-list");
  const task = document.createElement("div");
  task.classList.add("task");
  task.draggable = true;
  task.innerHTML = `
    <strong>${taskTitle.value}</strong>
    <p>${taskDesc.value}</p>
    <button onclick="editTask(this)">Edit</button>
    <button onclick="removeTask(this)">Delete</button>
  `;
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);
  column.appendChild(task);
  closeTaskModal();
});

// Remove Task
function removeTask(button) {
  button.closest(".task").remove();
}

// Edit Task
function editTask(button) {
  const task = button.closest(".task");
  const title = task.querySelector("strong").textContent;
  const desc = task.querySelector("p").textContent;
  taskTitle.value = title;
  taskDesc.value = desc;
  openTaskModal(currentColumn);
  task.remove();
}

// Drag & Drop
const columns = document.querySelectorAll(".task-list");

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    column.classList.add("drag-over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("drag-over");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    const task = document.querySelector(".dragging");
    column.appendChild(task);
    column.classList.remove("drag-over");
  });
});

function dragStart() {
  this.classList.add("dragging");
}

function dragEnd() {
  this.classList.remove("dragging");
}
