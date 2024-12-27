let loadTask = function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((taskText) => {
        let li = document.createElement('li');
        let taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = taskText;

        li.appendChild(taskTextSpan);

        li.classList.add('saved-task');
        li.style.color = '#00ff00';

        let div = document.createElement('div');
        div.classList.add('div-container');
        li.appendChild(div);

        div.innerHTML = `
        
        <ul class="ul-control">
                <li class="save-li"><i class="fa-solid fa-floppy-disk save"></i><span class="save-span">unsave</span></li>
                <li class="edit-li"><i class="fa-solid fa-pen-to-square"></i><span>Edit</span></li>
                <li class="delete-li"><i class="fa-solid fa-trash-can delete"></i><span>Delete</span></li>
            </ul>
            `;
            let ul = document.querySelector('.ul-list');
            ul.appendChild(li)
    });
};
loadTask();


let addTask = function() {
    let taskInput = document.querySelector('#task');
    let addButton = document.querySelector('.btn-add');

    addButton.addEventListener('click', (e) => {
        if(taskInput.value.trim() === '') {
            e.preventDefault();
            document.querySelector('.form-label').textContent ='Please type a task';
            taskInput.style.border = '1px solid #FF0000';
        }else {
            e.preventDefault();

            document.querySelector('.form-label').textContent ='Create a Task';
            taskInput.style.border = ''; 
            let input = document.querySelector('#task').value.trim();
            taskInput.value = '';

            let li = document.createElement('li');
            let taskTextSpan = document.createElement('span');
            taskTextSpan.classList.add('task-text');
            taskTextSpan.textContent = input;

            li.setAttribute('data-id', Date.now());
            li.classList.add('task-item');

            let div = document.createElement('div');
            div.classList.add('div-container');
            div.innerHTML = `
            <ul class="ul-control">
                <li class="save-li"><i class="fa-solid fa-floppy-disk save"></i><span class="save-span">save</span></li>
                <li class="edit-li"><i class="fa-solid fa-pen-to-square edit"></i><span class="edit-span">Edit</span></li>
                <li class="delete-li"><i class="fa-solid fa-trash-can delete"></i><span class="delete-span">Delete</span></li>
            </ul>
        `;

        li.appendChild(taskTextSpan);
        li.appendChild(div);

        let ul = document.querySelector('.ul-list');
        ul.appendChild(li);
        }
    });
};
addTask();


let controls = function() {
    let ul = document.querySelector('.ul-list');

    ul.addEventListener('click', (e) => {
        let currentTask = e.target.closest('.ul-control')?.parentElement?.parentElement;
        if (!currentTask) return;

        let saveSpan = currentTask.querySelector('.save-span');
        let taskText = currentTask.querySelector('.task-text');
        let taskInput = document.querySelector('#task');
        let dialog = document.createElement('dialog');

        const modal = {
            deleteMessage: 'Are you sure you want to delete this task',
            confirmButton: 'Confirm',
            cancelButton: 'Cancel',
            warningMessage: 'Your task is saved. A saved task can’t be deleted. Please unsave and delete.'
        }

        let confirmSave = document.createElement('button');
        confirmSave.classList.add('confirm-save');
        
        let confirmDelete = document.createElement('button');
        confirmDelete.classList.add('confirm-delete');

        let cancelDelete = document.createElement('button');
        cancelDelete.classList.add('cancel-delete');

        if (e.target.classList.contains('save')) {
            if (currentTask.classList.contains('saved-task')) {
                currentTask.classList.remove('saved-task');
                currentTask.style.color = '';
                saveSpan.textContent = 'save';
                removeTask(currentTask);
            }else {
                currentTask.classList.add('saved-task');
                currentTask.style.color = '#00ff00';
                saveSpan.textContent = 'unsave';
                saveTask(currentTask);
            }
        }

        if (e.target.classList.contains('edit')) {
            if (taskText) {
                taskInput.value = taskText.textContent.trim();
                taskInput.style.color = '#2173a6';
                currentTask.remove();
                removeTask(currentTask);
            }else {
                taskInput.style.color = ''; 
            }
        }

        if(e.target.classList.contains('delete')) {
            if(currentTask.classList.contains('saved-task')) {

                dialog.innerHTML = `
                <p>${modal.warningMessage}</p>

                <div class= 'save-task'>
                <button class="confirm-save">${modal.confirmButton}</button>
                </div>
                `;
                document.body.appendChild(dialog);
                dialog.showModal();

                dialog.querySelector('.confirm-save').addEventListener('click', () => {
                    currentTask.classList.remove('saved-task');
                    currentTask.style.color = '';
                    saveSpan.textContent = 'save';
                    removeTask(currentTask);
                    dialog.close();
                    dialog.remove();
                });
            }else {
                dialog.innerHTML = `
                <p>${modal.deleteMessage}</p>

                <div class= 'delete-task'>
                <button class="confirm-delete">${modal.confirmButton}</button>
                <button class="cancel-delete">${modal.cancelButton}</button>
                </div>
                `;
                document.body.appendChild(dialog);
                dialog.showModal();

                dialog.querySelector('.confirm-delete').addEventListener('click', () => {
                    currentTask.remove();
                    removeTask(currentTask);
                    dialog.close();
                    dialog.remove();
                });

                dialog.querySelector('.cancel-delete').addEventListener('click', () => {
                    dialog.close();
                    dialog.remove();
                });
            }
        }
    });
}
controls();



let saveTask = function(currentTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    let taskTextElement = currentTask.querySelector('.task-text');
    let taskText = taskTextElement ? taskTextElement.textContent.trim() : '';

    if(!tasks.includes(taskText)) {
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else {
        alert(`Task already saved: ${taskText}`);
    }
}


let removeTask = function(currentTask) {
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskTextElement = currentTask.querySelector('.task-text');
let taskText = taskTextElement ? taskTextElement.textContent.trim() : '';

tasks = tasks.filter(task => task !== taskText);

localStorage.setItem('tasks', JSON.stringify(tasks));
}