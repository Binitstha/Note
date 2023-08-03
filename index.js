let prevDataArr1;
let date = new Date();
const day = document.querySelector(".day");
const noteBox = document.querySelector(".note-box");
const month = document.querySelector(".month");
const noteTitle = document.querySelector(".note-title");
const noteDesc = document.querySelector(".note-desc");
const title = document.getElementById("title");
const desc = document.getElementById("description");
const addBtn = document.getElementById("Addbutton");
const box = document.querySelector(".box");
const closeBtn = document.getElementById("close");
const submitBtn = document.getElementById("submitBtn");
const alertBox1 = document.getElementById("alert1");
const alertBox2 = document.getElementById("alert2");
const forms = document.getElementById("forms");
const body = document.getElementById("home");
const list = document.getElementById("list");
const btn = document.querySelector(".button-e");
let monthList = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
addBtn.addEventListener("click", () => {
  box.classList.toggle("active");
  box.style.transition = ".7s";
});

closeBtn.addEventListener("click", () => {
  box.classList.toggle("active");
});
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!title.value || !desc.value) {
    alertBox2.classList.add("alert");
    setTimeout(() => {
      alertBox2.classList.remove("alert");
    }, 2000);
    alertBox2.style.transition = ".6s ease-out";
    return;
  } else {
    alertBox1.classList.add("alert");
    setTimeout(() => {
      alertBox1.classList.remove("alert");
    }, 2000);
    alertBox1.style.transition = "1.3s ease-out";
    box.classList.toggle("active");
  }
  addData();
  forms.reset();
});

function addData() {
  const prevData = localStorage.getItem("tasks");
  const prevDataArr = prevData ? JSON.parse(prevData) : [];
  prevDataArr.push({
    title: title.value,
    desc: desc.value,
    day: date.getDate(),
    month: date.getMonth(),
    id: Date.now(),
    TaskStatus: "incomplete",
  });
  localStorage.setItem("tasks", JSON.stringify(prevDataArr));
  getData();
}
function getData() {
  const prevData = localStorage.getItem("tasks");
  const prevDataArr = prevData ? JSON.parse(prevData) : [];
  list.innerHTML = "";
  // displayContent(prevDataArr);
  displayContentPromise();
}
function displayContentPromise() {
  let promise = new Promise((resolve, reject) => {
    const prevData = localStorage.getItem("tasks");
    const prevDataArr = prevData ? JSON.parse(prevData) : [];
    if (prevDataArr != null) {
      resolve(displayContent(prevDataArr));
    } else {
      reject("rejected");
    }
  });
  promise
    .then(() => console.log("resolve"))
    .catch((error) => console.log(error));
}

function displayContent(arr) {
  list.innerHTML = "";
  arr.forEach((data) => {
    list.innerHTML += `
    <div class="note" ondblclick="displayTask(${data.id})">
    <div class="date">
    <div class="month">${monthList[data.month]}</div>
    <div class="day">${data.day}</div>
    </div>
    <div class="note-titles">
    <div>
    <h3 class="note-title">${data.title}</h3>
    <p style="text-overflow: ellipsis;" class="note-desc">${data.desc}</p>
    </div>
    <div class="taskBtn">
    <button id="deleteBtn" onclick="deleteTask(${data.id})">Delete</button>
    <button id="taskStatusId" class="complete" onclick="changeStatus(${data.id})">Complete</button>
    <button onclick="displayEdit(${data.id})" class= "edit">Edit</button>
    </div>
    </div>
    </div>`;
  });
}

function displayTask(id) {
  const prevData = localStorage.getItem("tasks");
  const prevDataArr = prevData ? JSON.parse(prevData) : [];
  const currentTask = prevDataArr.find((el) => {
    return el.id === id;
  });
  noteBox.classList.add("active1");
  noteBox.style.transition = ".6s";
  noteBox.innerHTML = `<button id="closeNote" class="close-open">x</button>
  <div class="title-open">${currentTask.title}</div>
  <div class="desc-open">${currentTask.desc}</div`;

  const closeNoteBtn = document.getElementById("closeNote");
  closeNoteBtn.addEventListener("click", () => {
    console.log("Hello");
    noteBox.classList.remove("active1");
  });
}

function deleteTask(id) {
  const prevData = localStorage.getItem("tasks");
  const prevDataArr = prevData ? JSON.parse(prevData) : [];
  const taskIndex = prevDataArr.findIndex((el) => {
    return el.id === id;
  });
  prevDataArr.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(prevDataArr));
  getData();
}

const completeBtn = document.querySelector(".button-e-completed");
completeBtn.addEventListener("click", () => {
  const prevData = localStorage.getItem("tasks");
  const prevDataArr = prevData ? JSON.parse(prevData) : [];

  let statusComplete = prevDataArr.filter((eli) => {
    return eli.TaskStatus == "complete";
  });
  displayContent(statusComplete);
});
const incompleteBtn = document.querySelector(".button-e-incomplete");
incompleteBtn.addEventListener("click", () => {
  const prevData = localStorage.getItem("tasks");
  const prevDataArr = prevData ? JSON.parse(prevData) : [];
  let statusinComplete = prevDataArr.filter((eli) => {
    return eli.TaskStatus == "incomplete";
  });
  displayContent(statusinComplete);
});

const allBtn = document.querySelector(".allBtn");
allBtn.addEventListener("click", () => {
  const prevData = localStorage.getItem("tasks");
  const prevDataArr = prevData ? JSON.parse(prevData) : [];
  displayContent(prevDataArr);
});
const editBtn = document.querySelector(".edit");
const editCloseBtn = document.querySelector("#closeEdit");
const editInput = document.querySelector(".box-edit");

editCloseBtn.addEventListener("click", () => {
  editInput.classList.toggle("editActive");
});
const editSubmit = document.getElementById("submitBtn-edit");
const editDesc = document.getElementById("description-edit");
const editTitle = document.getElementById("title-Edit");

function deleteEditedTask(id) {
  editSubmit.addEventListener("click", () => {
    const prevData = localStorage.getItem("tasks");
    const prevDataArr = prevData ? JSON.parse(prevData) : [];
    const taskIndex = prevDataArr.findIndex((el) => {
      return el.id === id;
    });
    prevDataArr[taskIndex].title = editTitle.value;
    prevDataArr[taskIndex].desc = editDesc.value;
    prevDataArr[taskIndex].day = date.getDate();
    prevDataArr[taskIndex].month = date.getMonth();
    localStorage.setItem("tasks", JSON.stringify(prevDataArr));
    editInput.classList.remove("editActive");
    console.log(prevDataArr);
  });
}

function displayEdit(id) {
  editInput.classList.toggle("editActive");
  const prevData = localStorage.getItem("tasks");
  const prevDataArr = prevData ? JSON.parse(prevData) : [];
  const currentTask = prevDataArr.find((el) => {
    return el.id === id;
  });
  editTitle.value = `${currentTask.title}`;
  editDesc.innerHTML = `${currentTask.desc}`;
  deleteEditedTask(id);
}

getData();