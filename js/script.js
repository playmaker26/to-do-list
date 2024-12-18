let loadTask = function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const ul = document.querySelector('.ul-list');

    ul.innerHTML = '';

    tasks.forEach(task => {
        if(task.text && task.isSaved) {
            let li = document.createElement('li');
            li.textContent = task.text;
            li.classList.add('saved-task');
            li.style.color = '#00ff00';

            let div = document.createElement('div');
            div.classList.add('div-container');
            div.innerHTML = `
            <ul class="ul-control">
                <li class="save-li"><i class="fa-solid fa-floppy-disk save"></i><span class="save-span">unsave</span></li>
                <li class="edit-li"><i class="fa-solid fa-pen-to-square"></i><span>Edit</span></li>
                <li class="delete-li"><i class="fa-solid fa-trash-can delete"></i><span>Delete</span></li>
            </ul>
        `;
        li.appendChild(div);
        ul.appendChild(li);
        }
    });
}
loadTask();

let addTask = function() {    
    let inputTask = document.querySelector('#task');
    let btnAdd = document.querySelector('.btn-add');



    btnAdd.addEventListener('click', (e) => {

        if(inputTask.value.trim() === '') {
            e.preventDefault();
            inputTask.style.border = '1px solid #FF0000';
            document.querySelector('.form-label').innerText = 'Please type a task';
        }else {
            e.preventDefault();
            let li = document.createElement('li');
            let ul = document.querySelector('.ul-list');
            let div =document.createElement('div');
            div.classList.add('div-container');
            const taskText = inputTask.value;
            inputTask.value = '';
            li.textContent = taskText;
            ul.appendChild(li);
            li.appendChild(div);
            div.innerHTML = `
            <ul class="ul-control">
            <li class="save-li"><i class="fa-solid fa-floppy-disk save"></i><span class="save-span">Save</span></li>
            <li class="edit-li"><i class="fa-solid fa-pen-to-square"></i><span>Edit</span></li>
            <li class="delete-li"><i class="fa-solid fa-trash-can delete"></i><span>Delete</span></li>
            </ul>
            `;
        }
    });
}
addTask();


let controls = function() {
let ul = document.querySelector('.ul-list');
    let dialog = document.createElement('dialog');
    let button = document.createElement('button');
    let currentTask = document.querySelectorAll('main header .ul-list li');
    const modal = {
        deleteMessage: 'Are you sure you want to delete this task',
        confirmBtn: 'Confirm',
        cancelBtn: 'Cancel',
        savedMessage: 'Your task is saved. A saved task can’t be deleted. Please unsave and delete.'
    }
ul.addEventListener('click', (e) => {
if(e.target.classList.contains('save')) {
    const clickedTask = e.target.parentElement.parentElement.parentElement.parentElement;
    const saveSpan = clickedTask.querySelector('.save-span');

    if(clickedTask.classList.contains('saved-task')) {
        clickedTask.classList.remove('saved-task');
        clickedTask.style.color = '';
        saveSpan.textContent = 'save';
    }else {
        clickedTask.classList.add('saved-task');
        clickedTask.style.color = '#00ff00';
        saveSpan.textContent = 'unsave'; 
        saveTask();
    }
}
});

}
controls();

let saveTask = function() {
    let tasks = [];

document.querySelectorAll('.ul-list li').forEach(function(item){
    tasks.push({
        text: item.firstChild.textContent.trim(),
        isSaved: true
    });
});

localStorage.setItem('tasks', JSON.stringify(tasks));
};


