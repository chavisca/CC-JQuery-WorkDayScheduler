var currentDayEl = $('#currentDay');
var idList = ["hour-9", "hour-10", "hour-11", "hour-12", "hour-13", "hour-14", "hour-15", "hour-16", "hour-17"];
var buttons = document.querySelectorAll('.btn saveBtn');

$(function() {

// Sets current time in DOM then month and formatS
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