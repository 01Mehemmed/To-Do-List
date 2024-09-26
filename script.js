document.addEventListener('DOMContentLoaded', () => {
    loadToDoItems();
});

const formToDo = document.getElementById('todoForm');
const inpParrent = document.getElementById('inpParrent');
let toDoItems = [];

formToDo.addEventListener('submit', event => {
    event.preventDefault();

    const inputText = document.getElementById('textInp').value;

    if (inputText.trim() !== "") {
        addToDoItem(inputText);
        toDoItems.push(inputText);
        saveToLocalStorage();
        document.getElementById('textInp').value = "";
    }
});

const sort = document.getElementById('sorting');

sort.addEventListener('click', () => {
    sort.classList.toggle('fa-arrow-down-short-wide');
    sort.classList.toggle('fa-arrow-up-wide-short');

    if (sort.classList.contains('fa-arrow-down-short-wide')) {
        toDoItems.sort((a, b) => a.localeCompare(b));
    } else {
        toDoItems.sort((a, b) => b.localeCompare(a));
    }

    renderToDoItems();
    saveToLocalStorage();
});

function addToDoItem(text) {
    let todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    let itemText = document.createElement('p');
    itemText.textContent = text;

    let parDiv = document.createElement('div');
    parDiv.classList.add('btns_box');

    let edit = document.createElement('i');
    edit.className = 'fa-regular fa-pen-to-square edit_Btn';
    edit.addEventListener('click', () => {
        const newTaskText = prompt('Edit task:', itemText.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            toDoItems = toDoItems.map(item => item === text ? newTaskText.trim() : item);
            itemText.textContent = newTaskText.trim();
            updateLocalStorage();
        }
    });


    let removeBtn = document.createElement('i');
    removeBtn.className = 'fa-regular fa-circle-xmark todo-remove';
    removeBtn.addEventListener('click', () => {
        todoItem.remove();
        toDoItems = toDoItems.filter(item => item !== text);
        updateLocalStorage();
    });

    parDiv.append(edit, removeBtn);
    todoItem.appendChild(itemText);
    todoItem.appendChild(parDiv);
    inpParrent.appendChild(todoItem);
}

function renderToDoItems() {
    inpParrent.innerHTML = '';
    toDoItems.forEach(item => addToDoItem(item));
}

function saveToLocalStorage() {
    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
}

function loadToDoItems() {
    const data = localStorage.getItem('toDoItems');
    if (data) {
        toDoItems = JSON.parse(data);
        renderToDoItems();
    }
}

function updateLocalStorage() {
    saveToLocalStorage();
}