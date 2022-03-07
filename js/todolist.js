// TO DO LIST DEFINITIONS
let listDOM = document.querySelector("#list"); // ul of List Elements
let inputDOM = document.querySelector("#input"); // To Do List Input
let closeButtons = document.getElementsByClassName("listCloseButton"); // Close Button of List Elements
let checkLine = document.getElementsByTagName("li"); // To Do List Elements

// TOAST DEFINITION
let toastOption = { delay: 3000 };
let toast = document.querySelector(".toast"); // Toast Body
let toastAlert = new bootstrap.Toast(toast, toastOption);
let toastMessage = document.querySelector(".message"); // Toast Message Element

// CALL VALUES FROM LOCAL STORAGE
if (localStorage.getItem("to-do")) {
    for (let i = 0; i < JSON.parse(localStorage.getItem("to-do")).length; i++) {
        let liDOM = document.createElement("li"); // Create List Element
        liDOM.innerHTML = JSON.parse(localStorage.getItem("to-do"))[i]; // Add Value from Local Storage to List Element
        listDOM.append(liDOM); // Add List to the ul
        createButton(liDOM); // Call Button Element Function
        eventListeners(); // Call Event Listener Function for Added List Elements
    }
};

// CREATE AND ADD LIST ELEMENT WITH BUTTON TO UL, TOAST AND ADD INPUT VALUE TO LOCAL STORAGE
function newElement() {

    // Check Local Storage
    if (localStorage.getItem("to-do")) {
        arr = JSON.parse(localStorage.getItem("to-do"));
    } else {
        arr = new Array;
    };

    // Add Input Values to ul as li with toast Notice
    if (inputDOM.value && isFinite(inputDOM.value) == false) {
        arr.push(inputDOM.value); // Add Input Value to Array for Local Storage

        let liDOM = document.createElement("li"); // Create List Element
        liDOM.innerHTML = inputDOM.value; // Add Value from Input to List Element
        createButton(liDOM); // Call Button Element Function

        listDOM.append(liDOM); // Add li Element to the To Do List
        toastMessage.innerHTML = "Listeye Başarıyla Eklendi"
        toastMessage.classList.remove("text-danger");
        toastMessage.classList.add("text-success");
        toastAlert.show();

    } else {
        toastMessage.innerHTML = "Listeye Boş Ekleme Yapılamaz"
        toastMessage.classList.remove("text-success");
        toastMessage.classList.add("text-danger");
        toastAlert.show();
    };

    eventListeners(); // Call Event Listener Function for Added List Element
    localStorage.setItem("to-do", JSON.stringify(arr)); // Add Input Value to the Local Storage
    inputDOM.value = "";
};

// CREATE BUTTON ELEMENT FOR LIST ELEMENT
function createButton(liDOM) {
    let button = document.createElement("button"); // Create Button Element
    button.classList.add("listCloseButton"); // Add Class to Button Element
    button.innerHTML = "X"; // Add X to use as Close Button
    liDOM.appendChild(button); // Add Button as List Child  
};

// EVENT LISTENERS OF CLOSE BUTTON AND CHECKLINE
function eventListeners() {
    // Added Event Listener to all Close Button Elements
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", closeList);
    };

    // Added Event Listener to all List Elements
    for (let i = 0; i < checkLine.length; i++) {
        checkLine[i].addEventListener("click", checker);
    };
};

// CHECK THE LIST
function checker() {
    this.classList.toggle("checked");
};

// CLOSE THE LIST ELEMENT AND REMOVE THE VALUE FROM LOCAL STORAGE
function closeList() {
    this.parentElement.remove();
    arr = JSON.parse(localStorage.getItem("to-do"));
    arr.splice(arr.indexOf(this.parentElement.innerText.slice(0, this.parentElement.innerText.length - 1)), 1);
    localStorage.setItem("to-do", JSON.stringify(arr));
};