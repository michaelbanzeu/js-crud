var selectedRow = null;

let addEmp = document.getElementById('submit');
addEmp.addEventListener('click', function (e) {
    e.preventDefault();
    if (validate()) {
        let formData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
        resetForm();
    }
});

function readFormData() {
    let formData = {};
    formData["fullName"] = document.getElementById('fullName').value;
    formData["empCode"] = document.getElementById('empCode').value;
    formData["salary"] = document.getElementById('salary').value;
    formData["city"] = document.getElementById('city').value;
    return formData;
};

function insertNewRecord(data) {
    let table = document.getElementById('employeeList').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    celll2 = newRow.insertCell(1);
    celll2.innerHTML = data.empCode;
    celll3 = newRow.insertCell(2);
    celll3.innerHTML = data.salary;
    celll4 = newRow.insertCell(3);
    celll4.innerHTML = data.city;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a style="color:green" onClick="onEdit(this)">Edit</a> <a style="color:red" onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById('fullName').value = "";
    document.getElementById('empCode').value = "";
    document.getElementById('salary').value = "";
    document.getElementById('city').value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('fullName').value = selectedRow.cells[0].innerHTML;
    document.getElementById('empCode').value = selectedRow.cells[1].innerHTML;
    document.getElementById('salary').value = selectedRow.cells[2].innerHTML;
    document.getElementById('city').value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm("Do you really want to delete this record ?")) {
        rowToDelete = td.parentElement.parentElement;
        document.getElementById('employeeList').deleteRow(rowToDelete.rowIndex);
    }
}

function validate() {
    let isValid = true;
    if (document.getElementById('fullName').value == "" ||
        document.getElementById('empCode').value == "" ||
        document.getElementById('salary').value == "") {
        isValid = false;
        document.getElementById('fullNameValidationError').classList.remove("hide");
        document.getElementById('empCodeValidationError').classList.remove("hide");
        document.getElementById('salaryValidationError').classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById('fullNameValidationError').classList.contains("hide") ||
            !document.getElementById('empCodeValidationError').classList.contains("hide") ||
            !document.getElementById('salaryValidationError').classList.contains("hide")) {
            document.getElementById('fullNameValidationError').classList.add("hide");
            document.getElementById('empCodeValidationError').classList.add("hide");
            document.getElementById('salaryValidationError').classList.add("hide");
        }
    }
    return isValid;
}
