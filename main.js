const addTask = document.querySelector('button');
const task = document.getElementById('task');
let tasks = document.body.getElementsByClassName('taskSticker');
let taskCount = document.querySelector('.taskCount');
let completed = document.querySelector('.completedTasks');
let completedTasks = document.body.getElementsByClassName('taskSticker completed');
let remaining = document.querySelector('.remainingTasks');
const doneFilter = document.querySelector('.doneFilter');
const noFilter = document.querySelector('.noFilter');
const incompleteFilter = document.querySelector('.incompleteFilter');
const deleteAllTasks  = document.querySelector('.deleteAllTasks');

updateTotal();
updateCompleted();
updateRemaining();

doneFilter.addEventListener('click', function(){
    for(let i = 0; i < tasks.length; i++) {
        tasks[i].style.display = 'none';
    }
    for(let i = 0; i < tasks.length; i++) {
        if (tasks[i].getAttribute('class') === 'taskSticker completed') {
            tasks[i].style.display = '';
    }
}
});
noFilter.addEventListener('click', function(){
    for(let i = 0; i < tasks.length; i++) {
        tasks[i].style.display = '';
    }
});
incompleteFilter.addEventListener('click', function(){
    for(let i = 0; i < tasks.length; i++) {
        tasks[i].style.display = 'none';
    }
    for(let i = 0; i < tasks.length; i++) {
        if (tasks[i].getAttribute('class') === 'taskSticker') {
            tasks[i].style.display = '';
        }
    }
});
deleteAllTasks.addEventListener('click', function(e) {
    e.stopPropagation();
    let initialTasksNumber = tasks.length;
    for(let i = initialTasksNumber - 1; i >= 0 ; i--) {
        console.log(i);
        tasks[i].parentElement.removeChild(tasks[i]);
    }
    updateTotal();
    updateCompleted();
    updateRemaining();
})

addTask.addEventListener('click', function(){
    if(task.value !== ''){
    newTask();
    task.value = '';
    }

    else {
        window.alert('please write a task');
    }
    updateTotal();
    updateCompleted();
    updateRemaining();
    });
task.addEventListener('keyup', function(e) {
    // Number 13 is the "Enter" key on the keyboard
    if (e.key === 'Enter') {
      // Cancel the default action, if needed
      e.preventDefault();
      // Trigger the button element with a click
      addTaskClick();
    }
    updateTotal();
    updateCompleted();
    updateRemaining();
    });
    
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
        
        deleteTask.addEventListener('click', function(e) {
            e.stopPropagation();
            e.target.parentElement.parentElement.style.opacity = '0';
            e.target.parentElement.parentElement.addEventListener('transitionend', function(){
                e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                updateTotal();
                updateCompleted();
                updateRemaining();
            })
        
            
            // e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
        })
        taskStatus.addEventListener('click', function(e) {
            e.stopPropagation();
            if(e.target.parentElement.parentElement.getAttribute('class') === 'taskSticker') {
                e.target.setAttribute('title', 'click to mark as not completed');
                e.target.parentElement.parentElement.setAttribute('class', 'taskSticker completed');
            }
            else {
                e.target.setAttribute('title', 'click to mark as completed');
                e.target.parentElement.parentElement.setAttribute('class', 'taskSticker');
            }
            updateTotal();
            updateCompleted();
            updateRemaining();
    
        });
    }

function addTaskClick() {
    addTask.click();
}

function updateTotal() {
    tasks = document.body.getElementsByClassName('taskSticker');
    if(tasks.length === 1) {
        taskCount.textContent = 'YOU HAVE ' + tasks.length + ' TASK';
    }
    else {
        taskCount.textContent = 'YOU HAVE ' + tasks.length + ' TASKS';
    }
    if(tasks.length > 0) {
        taskCount.style.color = 'black';
    }
    if(tasks.length === 1) {
        taskCount.textContent = 'YOU HAVE ' + tasks.length + ' TASK';
    }
    else {
        taskCount.textContent = 'YOU HAVE ' + tasks.length + ' TASKS';
    }
    
}

function updateCompleted() {
    completedTasks = document.body.getElementsByClassName('taskSticker completed');
    completed.textContent = 'COMPLETED '+completedTasks.length;
}

function updateRemaining() {
    remaining = document.querySelector('.remainingTasks');
    remaining.textContent = 'REMAINING ' + (tasks.length - completedTasks.length);
}

// add style change in CSS instaed of JS
// add transitions (when tasks are marked completed or incomplete/deleted/filtered)
// Add a delete all button
// Add a change status for all button
