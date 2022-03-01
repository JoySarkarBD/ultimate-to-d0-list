function getId(id) {
  return document.getElementById(id);
}

const form = getId("form");
const date = getId("date");
const tableData = getId("tableBody");
const today = new Date().toISOString().slice(0, 10);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputs = [...this.elements];
  const inputData = {};
  inputs.forEach((data) => {
    if (data.type !== "submit") {
      inputData[data.name] = data.value;
    }
  });
  inputData.status = "incomplete";
  displayData(inputData);
  this.reset();
});

function displayData({ name, priority, date, status }) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <tr>
    <td>1</td>
    <td>${name}</td>
    <td>${priority}</td>
    <td>${status}</td>
    <td>${date}</td>
    <td>
    <button><i class="fas fa-pen-fancy"></i></button>
    <button><i class="fas fa-check"></i></button>
    <button><i class="fas fa-trash"></i></button>
    </td>
    </tr>`;
  tableData.appendChild(tr);
}
