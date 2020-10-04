const addTask = document.querySelector('button');
const task = document.getElementById('task');
let tasks = document.body.getElementsByClassName('taskSticker');
let taskCount = document.querySelector('.taskCount');
let completed = document.querySelector('.completedTasks');
taskCount.textContent = 'YOU HAVE ' + tasks.length + ' TASKS';
let completedTasks = document.body.getElementsByClassName('taskSticker completed');
completed.textContent = 'COMPLETED '+completedTasks.length;
let remaining = document.querySelector('.remainingTasks');
remaining.textContent = 'REMAINING ' + (tasks.length - completedTasks.length);

function newTask (){
    taskSticker = document.createElement('div');
    taskSticker.setAttribute('class', 'taskSticker');
    document.body.appendChild(taskSticker);

    taskText = document.createElement('p');
    taskSticker.appendChild(taskText);
    taskText.textContent = task.value;

    buttons = document.createElement('div');
    buttons.setAttribute('class', 'buttons');
    taskSticker.appendChild(buttons);

    taskStatus = document.createElement('div');
    taskStatus.setAttribute('class', 'taskStatus');
    taskStatus.setAttribute('title', 'click to mark as completed');
    buttons.appendChild(taskStatus);

    deleteTask = document.createElement('div');
    deleteTask.setAttribute('class', 'deleteTask1');
    deleteTask.setAttribute('title', 'Click to delete this task');
    buttons.appendChild(deleteTask);

    tasks = document.body.getElementsByClassName('taskSticker');
    if(tasks.length > 0) {
        taskCount.style.color = 'black';
    }
    if(tasks.length === 1) {
        taskCount.textContent = 'YOU HAVE ' + tasks.length + ' TASK';
    }
    else {
        taskCount.textContent = 'YOU HAVE ' + tasks.length + ' TASKS';
    }
    
    deleteTask.addEventListener('click', function(e) {
        e.stopPropagation();
        e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
        tasks = document.body.getElementsByClassName('taskSticker');
        if(tasks.length === 1) {
            taskCount.textContent = 'YOU HAVE ' + tasks.length + ' TASK';
        }
        else {
            taskCount.textContent = 'YOU HAVE ' + tasks.length + ' TASKS';
        }
        if(tasks.length === 0) {
            taskCount.style.color = 'rgba(141, 141, 141)';
        }
        // if(tasks.length === 0) {
        //     taskCount.textContent ='';
        // }
        updateCompleted();
        updateRemaining();
    })
    taskStatus.addEventListener('click', function(e) {
        e.stopPropagation();
        if(e.target.style.backgroundImage === 'url("icons/neutral_button_tr.png")') {
            e.target.style.backgroundImage = 'url("icons/done_button_tr.png")';
            e.target.setAttribute('title', 'click to mark as not completed');
            e.target.parentElement.parentElement.setAttribute('class', 'taskSticker completed');
            e.target.parentElement.parentElement.querySelector('p').style.color='rgb(161, 161, 161)';
            e.target.parentElement.parentElement.querySelector('p').style.textDecoration='line-through';
            updateCompleted();
            updateRemaining();
        }
        else {
            e.target.style.backgroundImage ='url("icons/neutral_button_tr.png")';
            e.target.setAttribute('title', 'click to mark as completed');
            e.target.parentElement.parentElement.setAttribute('class', 'taskSticker');
            e.target.parentElement.parentElement.querySelector('p').style.color='';
            e.target.parentElement.parentElement.querySelector('p').style.textDecoration='';
            updateCompleted();
            updateRemaining();
        }

    });
}
addTask.addEventListener('click', function(){
    if(task.value !== '') {
    newTask();
    task.value = '';
    }

    else {
        window.alert('please write a task');
    }
    updateCompleted();
    updateRemaining();
    })
task.addEventListener('keyup', function(e) {
    // Number 13 is the "Enter" key on the keyboard
    if (e.key === 'Enter') {
      // Cancel the default action, if needed
      e.preventDefault();
      // Trigger the button element with a click
      addTaskClick();
    }
    updateCompleted();
    updateRemaining();
    });


function addTaskClick() {
    addTask.click();
}

function updateCompleted() {
    completedTasks = document.body.getElementsByClassName('taskSticker completed');
    completed.textContent = 'COMPLETED '+completedTasks.length;
}

function updateRemaining() {
    remaining = document.querySelector('.remainingTasks');
    remaining.textContent = 'REMAINING ' + (tasks.length - completedTasks.length);
}

//add the change status code
// Add a delete all button
// Add a change status for all button
    