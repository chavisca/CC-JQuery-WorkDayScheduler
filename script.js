var currentDayEl = $('#currentDay');
var taskDisplayEl = $('#task-display');
var taskTextInputEl = $('#task-text-input');
var taskDateInput = $('task-date-input');
var idList = ["hour-9", "hour-10", "hour-11", "hour-12", "hour-13", "hour-14", "hour-15", "hour-16", "hour-17"];
var buttons = document.querySelectorAll('.btn saveBtn');


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?  Solved in analyzeTimeandModifyClasses function.
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

// Sets current time in DOM then month and ordinal day format
function displayTime() {  
  var rightNow = dayjs().format('dddd, MMMM DD [at] hh:mm A');
  currentDayEl.text(rightNow);
}

function analyzeTimeandModifyClasses() {
  var currentTime = dayjs();
  var currentHour = currentTime.hour();
  
  idList.forEach(function(id) {
    var hourID = document.getElementById(id);
    var time = hourID.getAttribute('data-time');
    var hour = parseInt(time.split(':')[0]);

    if (hour === currentHour) {
      hourID.classList.add('present');
    } else if (hour < currentHour) {
      hourID.classList.add('past');
    } else {
      hourID.classList.add('future');
    }
  });
}

// Reads tasks from local storage and returns array of task objects.
// Returns an empty array if there aren't any objects
function readTasksFromStorage() {
  var tasks = localStorage.getItem('tasks');
  if (tasks) {
    tasks = JSON.parse(tasks);
  } else {
    tasks = [];
  }
  return tasks;
}

// Takes an array of tasks and saves them in localStorage.
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Gets Task data from local storage and displays it - function may require multiple loops to run by each timeslot div-ID
function printTaskData() {
  // Clear current tasks on page
  taskDisplayEl.empty();

  // Get tasks from localStorage
  var tasks = readTasksFromStorage();
    // Add class to formatting - likely to use rows to populate data, need to storyboard layout (started above)
  };


// Adds task to local storage and prints the task data
function handleTaskFormSubmit(event) {
  event.preventDefault();

  var newTask = {
    text: taskText,
    time: div.id,
  };

  // Add project to local storage
  var tasks = readTasksFromStorage();
  tasks.push(newTask);
  saveTasksToStorage(tasks);

  // Print Task Data
  printTaskData();
}

// Event listener for Save click
buttons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    var parentDiv = event.target.closest('.time-block');
    var divID = div.id;
    var parentTextArea = event.target.closest('description');
    var taskText = parentTextArea.val().trim();
    var saveTask = {
    text: taskText,
    time: div.id,
    };
    handleTaskFormSubmit();
});
});

// Event listener for delete task click; commented out below line for testing
// taskDisplayEl.on('click', '.btn-delete-task', handleDeleteTask); 

displayTime();
setInterval(displayTime, 1000);
analyzeTimeandModifyClasses();
printTaskData();
