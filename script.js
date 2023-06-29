var currentDayEl = $('#currentDay');
var taskDisplayEl = $('#task-display');
var taskTextInputEl = $('#task-text-input');
var taskDateInput = $('task-date-input');

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
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
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
});

// Sets current time in DOW then month and ordinal day format
function displayTime() { 
  var rightNow = dayjs().day() + dayjs().format('MMM Do')
  currentDayEl.text(rightNow);
}

// Add function to comparee dayJS and determine past/present/future
// Function will need to add/remove classes to timeslot divs to change bg color styling for those rows in text-area class

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

  // Loop through each task and create a row
  for (var i = 0; i < tasks.length; i += 1) {
    var task = tasks[i];
    var taskDate = dayjs(task.date);
    var currentTime = dayjs() //finish dayJS statement
    // Create rows for tasks
    var rowEl = $('<tr>');
    var taskEl = $('<td>').text(task.text);
    var dateEl = $('<td>').text(task.date); //will need comparator to dayJS to assign task to proper timeslot

    var deleteEl = $(
      <button class="btn btn-sm btn-delete-task" data-index="' + i + '">X</button>
    );

    // Add class to formatting - likely to use rows to populate data, need to storyboard layout (started above)
  }
}

// Adds task to local storage and prints the task data
function handleTaskFormSubmit(event) {
  event.preventDefault();

  // Read user input from the form
  var taskInput = taskTextInputEl.val().trim();
  var taskDate = taskDateInputEl.val(); //needs code to identify which timeslot to save to appropriate timeslot

  var newTask = {
  text: taskInput,
  date: taskDate,
  };

  // Add project to local storage
  var tasks = readTasksFromStorage();
  tasks.push(newTask);
  saveTasksToStorage(tasks);

  // Print Task Data
  printTaskData();
}

// Event listener for Save click
taskDisplayEl.on('save', handleTaskFormSubmit); 

// Event listener for delete task click
taskDisplayEl.on('click', '.btn-delete-task', handleDeleteTask); 

displayTime();
setInternal(displayTime, 1000);