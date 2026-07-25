// Save button ko select kiya
let saveBtn = document.getElementById("saveBtn");

// Table ko select kiya
let table = document.getElementById("transactionList");

// Income aur Expense ki value store karne ke liye
let income = 0;
let expense = 0;

// Save button par click hoga to ye function chalega
saveBtn.onclick = function () {

    // Form se data lena
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    // Agar koi field khali ho
    if (date == "" || description == "" || amount == "" || type == "" || category == "") {
        alert("Please fill all fields");
        return;
    }

    // Table me ek nayi row banana
    let row = table.insertRow();

    // Cells me data dalna
    row.insertCell(0).innerHTML = date;
    row.insertCell(1).innerHTML = description;
    row.insertCell(2).innerHTML = category;
    row.insertCell(3).innerHTML = type;
    row.insertCell(4).innerHTML = "₹" + amount;
    row.insertCell(5).innerHTML = "<button>Delete</button>";

    // Income ya Expense calculate karna
    if (type == "Income") {
        income = income + amount;
    } else {
        expense = expense + amount;
    }

    // Balance calculate karna
    let balance = income - expense;

    // Cards update karna
    document.getElementById("currentBalance").innerHTML = "₹" + balance;
    document.getElementById("totalIncome").innerHTML = "₹" + income;
    document.getElementById("totalExpense").innerHTML = "₹" + expense;

    // Form clear karna
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("type").value = "";
    document.getElementById("category").value = "";
};