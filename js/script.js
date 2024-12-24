


let addTask = function() {
    let taskInput = document.querySelector('#task');
    let addButton = document.querySelector('.btn-add');
    
    addButton.addEventListener('click', (e) => {
        if(taskInput.value.trim() === '') {
            e.preventDefault();
            document.querySelector('.form-label').textContent = 'Please type a task';
            taskInput.style.border = '1px solid #FF0000';
        }else {
            e.preventDefault();
            
            document.querySelector('.form-label').textContent = 'Create a Task';
            taskInput.style.border = '';
            let input = document.querySelector('#task').value.trim();
            taskInput.value = '';
            let li = document.createElement('li');
            li.textContent = input;
            let taskId = Date.now();
            li.setAttribute('data-id', taskId);
            let div = document.createElement('div');
            div.classList.add('div-container');
            let ul = document.querySelector('.ul-list');
            ul.appendChild(li);
            li.appendChild(div);

            div.innerHTML = `
            <ul class="ul-control">
                <li class="save-li"><i class="fa-solid fa-floppy-disk save"></i><span class="save-span">save</span></li>
                <li class="edit-li"><i class="fa-solid fa-pen-to-square"></i><span>Edit</span></li>
                <li class="delete-li"><i class="fa-solid fa-trash-can delete"></i><span>Delete</span></li>
            </ul>
        `;
        }
    });
}
addTask();

let loadTask = function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTask);
    }
    loadTask();

let controls = function () {
 let ul = document.querySelector('.ul-list');

 ul.addEventListener('click', (e) => {
    if(e.target.classList.contains('save')) {
        let currentTask = e.target.closest('.ul-control').parentElement.parentElement;
        let saveSpan = currentTask.querySelector('.save-span');

        if(currentTask.classList.contains('saved-task')) {
            currentTask.classList.remove('saved-task');
            currentTask.style.color = '';
            saveSpan.textContent = 'save';
        }else {
            currentTask.classList.add('saved-task');
            currentTask.style.color = '#00ff00';
            saveSpan.textContent = 'unsave'; 
            saveTask(currentTask);
        }
    }
 });
};
controls();

let saveTask = function(currentTask) {
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskText = currentTask.textContent.trim();

if(!tasks.includes(taskText)) {
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}else {
    alert(`Task already saved: ${taskText}`);
}
}


