// ==========================
// GET HTML ELEMENTS
// ==========================

const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

const addTask = document.getElementById("addTask");

const taskTable = document.getElementById("taskTable");

const totalTask = document.getElementById("totalTask");
const completedTask = document.getElementById("completedTask");
const pendingTask = document.getElementById("pendingTask");

const searchTask = document.getElementById("searchTask");
const filterStatus = document.getElementById("filterStatus");

const themeBtn = document.getElementById("themeBtn");



// ==========================
// VARIABLES
// ==========================

let tasks = [];

let editId = null;



// ==========================
// ADD TASK
// ==========================

addTask.addEventListener("click", function () {

    if (
        taskInput.value === "" ||
        category.value === "" ||
        priority.value === "" ||
        dueDate.value === ""
    ) {

        alert("Please fill all fields");

        return;

    }

    const task = {

        id: Date.now(),

        name: taskInput.value,

        category: category.value,

        priority: priority.value,

        dueDate: dueDate.value,

        status: "Pending"

    };

    if(editId === null){

    tasks.push(task);

}else{

    tasks = tasks.map(function(item){

        if(item.id === editId){

            return{

                id:editId,

                name:taskInput.value,

                category:category.value,

                priority:priority.value,

                dueDate:dueDate.value,

                status:item.status

            };

        }

        return item;

    });

    editId = null;

}

saveToLocalStorage();

displayTasks();

updateSummary();

clearForm();

});



// ==========================
// DISPLAY TASKS
// ==========================

function displayTasks() {

    taskTable.innerHTML = "";

    tasks.forEach(function(task){

        taskTable.innerHTML += `

        <tr>

            <td>${task.name}</td>

            <td>${task.category}</td>

            <td>${task.priority}</td>

            <td>${task.dueDate}</td>

            <td class="${task.status.toLowerCase()}">
                ${task.status}
            </td>

            <td>

                <button class="complete-btn">
                    Complete
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}



// ==========================
// UPDATE SUMMARY
// ==========================

function updateSummary(){

    totalTask.innerText = tasks.length;

    completedTask.innerText = tasks.filter(function(task){

        return task.status === "Completed";

    }).length;

    pendingTask.innerText = tasks.filter(function(task){

        return task.status === "Pending";

    }).length;

}



// ==========================
// CLEAR FORM
// ==========================

function clearForm(){

    taskInput.value = "";

    category.value = "";

    priority.value = "";

    dueDate.value = "";

}

// ==========================
// DELETE TASK
// ==========================

function deleteTask(id){

    tasks = tasks.filter(function(task){

        return task.id !== id;

    });

    saveToLocalStorage();

    displayTasks();

    updateSummary();

}



// ==========================
// EDIT TASK
// ==========================

function editTask(id){

    const task = tasks.find(function(item){

        return item.id === id;

    });

    taskInput.value = task.name;

    category.value = task.category;

    priority.value = task.priority;

    dueDate.value = task.dueDate;

    editId = id;

}



// ==========================
// COMPLETE TASK
// ==========================

function completeTask(id){

    tasks = tasks.map(function(task){

        if(task.id === id){

            if(task.status === "Pending"){

                task.status = "Completed";

            }else{

                task.status = "Pending";

            }

        }

        return task;

    });

    saveToLocalStorage();

    displayTasks();

    updateSummary();

}



// ==========================
// UPDATE DISPLAY BUTTONS
// ==========================

function displayTasks(){

    taskTable.innerHTML = "";

    tasks.forEach(function(task){

        taskTable.innerHTML += `

        <tr class="${task.status==="Completed" ? "completed-row" : ""}">

            <td>${task.name}</td>

            <td>${task.category}</td>

            <td>${task.priority}</td>

            <td>${task.dueDate}</td>

            <td class="${task.status.toLowerCase()}">

                ${task.status}

            </td>

            <td>

                <button
                class="complete-btn"
                onclick="completeTask(${task.id})">

                ✓

                </button>

                <button
                class="edit-btn"
                onclick="editTask(${task.id})">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteTask(${task.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}



// ==========================
// LOCAL STORAGE SAVE
// ==========================

function saveToLocalStorage(){

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

}



// ==========================
// LOCAL STORAGE LOAD
// ==========================

function loadFromLocalStorage(){

    const data = localStorage.getItem("tasks");

    if(data){

        tasks = JSON.parse(data);

        displayTasks();

        updateSummary();

    }

}

loadFromLocalStorage();

// ==========================
// SEARCH TASK
// ==========================

searchTask.addEventListener("keyup", function () {

    const text = searchTask.value.toLowerCase();

    const rows = document.querySelectorAll("#taskTable tr");

    rows.forEach(function (row) {

        const taskName = row.cells[0].innerText.toLowerCase();

        if (taskName.includes(text)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});



// ==========================
// FILTER TASK
// ==========================

filterStatus.addEventListener("change", function () {

    const value = filterStatus.value;

    const rows = document.querySelectorAll("#taskTable tr");

    rows.forEach(function (row) {

        const status = row.cells[4].innerText;

        if (value === "All") {

            row.style.display = "";

        } else if (status === value) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});



// ==========================
// DARK MODE
// ==========================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeBtn.innerHTML = "☀️ Light Mode";

    } else {

        themeBtn.innerHTML = "🌙 Dark Mode";

    }

});



// ==========================
// EMPTY TASK MESSAGE
// ==========================

function checkEmptyTask() {

    if (tasks.length === 0) {

        taskTable.innerHTML = `

        <tr>

            <td colspan="6" class="empty-message">

                No Tasks Available

            </td>

        </tr>

        `;

    }

}



// ==========================
// UPDATE DISPLAY
// ==========================

const oldDisplay = displayTasks;

displayTasks = function () {

    oldDisplay();

    checkEmptyTask();

    saveToLocalStorage();

};



// ==========================
// INITIAL LOAD
// ==========================

displayTasks();

updateSummary();
