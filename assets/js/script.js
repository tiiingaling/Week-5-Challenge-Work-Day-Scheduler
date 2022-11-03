//GIVEN I am using a daily planner to create a schedule
//WHEN I open the planner
//THEN the current day is displayed at the top of the calendar
//WHEN I scroll down
//THEN I am presented with time blocks for standard business hours
//WHEN I view the time blocks for that day
//THEN each time block is color-coded to indicate whether it is in the past, present, or future
//WHEN I click into a time block
//THEN I can enter an event
//WHEN I click the save button for that time block
//THEN the text for that event is saved in local storage
//WHEN I refresh the page
//THEN the saved events persist


//core features
//date at the top
//time blocks for the day (9//5?)
//blocks colour coded for past present future
//can enter event (text) when clicking onto block
//press the save button to save to localStorage
//saved events persist when refreshing

const currentDayEl = document.getElementById('currentDay')
const containerEl = document.getElementsByClassName('container');

var currentDay = moment().format('MMMM Do YYYY, h:mm:ss a');
//currentDayEl.text(currentDay); not working for some reason

var workDayHours = [
    moment().hour(9).format('hA'),
    moment().hour(10).format('hA'),
    moment().hour(11).format('hA'),
    moment().hour(12).format('hA'),
    moment().hour(13).format('hA'),
    moment().hour(14).format('hA'),
    moment().hour(15).format('hA'),
    moment().hour(16).format('hA'),
    moment().hour(17).format('hA')
];

//add time blocks for each hour (3 columns in 9 rows: 9AM to 5PM) format for 9AM is hA
for (var i = 0; i < workDayHours.length; i++) {
    //add div with class row
    var timeBlockRow = $('<div>')
        .addClass('row time-block')

    // add 1 div with class hour
    var timeBlockHour = $('<div>')
        .addClass('col-1 hour')
        .text(workDayHours[i])
    // .attr('style', 'text-align: right');

    // add 1 div with class time-block
    var timeBlockEventSpace = $('<div>')
        .addClass('col-10 description')

    // add a button with class saveBtn
    var saveBtn = $('<button>')
        .addClass('col-1 saveBtn')
        .attr({
            id: 'save-button',
            type: 'button',
        });

    // add save icon
    var saveIcon = $('<i>')
        .addClass('fas fa-save');

    //append
    $(containerEl).append(timeBlockRow);
    $(timeBlockRow).append(timeBlockHour);
    $(timeBlockRow).append(timeBlockEventSpace);
    $(timeBlockRow).append(saveBtn);
    $(saveBtn).append(saveIcon);
}