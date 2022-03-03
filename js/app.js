// elements getting function
function getId(id) {
  return document.getElementById(id);
}

// get elements by id
const form = getId("form");
const date = getId("date");
const tableData = getId("tableBody");
const today = new Date().toISOString().slice(0, 10);
date.value = today;

// event of task adding secion
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputs = [...this.elements];
  const inputData = {};
  let isValid = true;
  inputs.forEach((data) => {
    if (data.type !== "submit") {
      if (data.value == "") {
        alert("You can't add empty data.");
        isValid = false;
        return;
      }
      inputData[data.name] = data.value;
    }
  });
  if (isValid) {
    inputData.status = "incomplete";
    inputData.id = uuidv4();
    const data = getDataFromLocalStorage();
    displayData(inputData, data.length + 1);
    data.push(inputData);
    setDataToLocalStorage(data);
  }
  this.reset();
});

window.onload = reloadData;

function reloadData() {
  tableData.innerHTML = "";
  const data = getDataFromLocalStorage();
  data.forEach((task, index) => {
    displayData(task, index + 1);
  });
}

function displayData({ name, priority, date, status, id }, index) {
  const tr = document.createElement("tr");
  tr.dataset.id = id;
  tr.innerHTML = `
    <td id="no">${index}</td>
    <td id="name">${name}</td>
    <td id="priority">${priority}</td>
    <td id="status">${status}</td>
    <td id="date">${date}</td>
    <td id="actions">
    <button id="edit"><i class="fas fa-pen-fancy"></i></button>
    <button id="check"><i class="fas fa-check"></i></button>
    <button id="delete"><i class="fas fa-trash"></i></button>
    </td>`;
  tableData.appendChild(tr);
}

// get data from localStorage
function getDataFromLocalStorage() {
  let tasks = [];
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
  }
  return tasks;
}

// set data to localStorage
function setDataToLocalStorage(data) {
  localStorage.setItem("tasks", JSON.stringify(data));
}

// actions to delete,edit and status
tableData.addEventListener("click", function (e) {
  if (e.target.id == "edit") {
    const tasks = e.target.parentElement.parentElement;
    const taskId = tasks.dataset.id;
    const taskChild = tasks.children;
  } else if (e.target.id == "check") {

    const tasks = e.target.parentElement.parentElement;
    const taskId = tasks.dataset.id;
    const taskChild = tasks.children;

    [...taskChild].forEach((taskChildData) => {
      if (taskChildData.id == "status") {

        let data = getDataFromLocalStorage();
        data = data.filter((task) => {
          if (task.id === taskId) {
            // return task;
            if(task.status=="incomplete"){
              task.status="complete"
              taskChildData.innerHTML="complete"
            }else{
              task.status="incomplete"
              taskChildData.innerHTML="incomplete"
            }
            return task;
          }else{
            return task;
          }
        });
        setDataToLocalStorage(data); 
      }
    });
  } else if (e.target.id == "delete") {
    const task = e.target.parentElement.parentElement;
    const taskId = task.dataset.id;
    task.remove();
    let data = getDataFromLocalStorage();
    data = data.filter((task) => {
      if (task.id !== taskId) {
        return task;
      }
    });
    setDataToLocalStorage(data);
    reloadData();
  }
});
