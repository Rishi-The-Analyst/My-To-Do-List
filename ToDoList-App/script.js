document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function loadTasks() {
    fetch("tasks.php")
      .then((res) => res.json())
      .then((tasks) => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
          const li = document.createElement("li");
          li.className = task.completed ? "completed" : "";
          li.innerHTML = `
            <span>${task.text}</span>
            <button class="toggle-btn" onclick="toggleTask(${index})">
              ${task.completed ? "Mark Pending" : "Mark Done"}
            </button>
          `;
          taskList.appendChild(li);
        });
      });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = input.value.trim();
    if (newTask) {
      fetch("tasks.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", text: newTask }),
      }).then(() => {
        input.value = "";
        loadTasks();
      });
    }
  });

  window.toggleTask = function (index) {
    fetch("tasks.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "toggle", index: index }),
    }).then(loadTasks);
  };

  loadTasks();
});
