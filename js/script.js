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
            <li class="save-li"><i class="fa-solid fa-floppy-disk save"></i><span>Save</span></li>
            <li class="edit-li"><i class="fa-solid fa-pen-to-square"></i><span>Edit</span></li>
            <li class="delete-li"><i class="fa-solid fa-trash-can delete"></i><span>Delete</span></li>
            </ul>
            `;
        }
    });
}
addTask();

