var currentDayEl = $('#currentDay');
var idList = ["hour-9", "hour-10", "hour-11", "hour-12", "hour-13", "hour-14", "hour-15", "hour-16", "hour-17"];
var buttons = document.querySelectorAll('.btn saveBtn');


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function() {

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

// Save button click event
function saveButtonClick(event) {
  var textarea = event.target.parentNode.parentNode.querySelector('.description');
  var textareaID = textarea.id;
  var textareaValue = textarea.value;

// Check for existing storage
var existingValue = localStorage.getItem(textareaID);
if (existingValue) {
  localStorage.removeItem(textareaID);
}

// Save text area to local storage
localStorage.setItem(textareaID, textareaValue);
}

// Retrieve saved data from local storage and display
function displayTaskFromLocalStorage() {
  var textareas = document.querySelectorAll('.description');
  textareas.forEach(function(textarea) {
    var textareaID = textarea.id;
    var savedValue = localStorage.getItem(textareaID);

    if (savedValue) {
      textarea.value = savedValue;
    }
  });
}

// Click events for all save buttons
var saveButtons = document.querySelectorAll('.saveBtn');
saveButtons.forEach(function(button) {
  button.addEventListener('click', saveButtonClick);
});

displayTime();
setInterval(displayTime, 1000);
analyzeTimeandModifyClasses();
displayTaskFromLocalStorage();
});