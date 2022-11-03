//core features
//date at the top
//time blocks for the day (9//5?)
//blocks colour coded for past present future
//can enter event (text) when clicking onto block
//press the save button to save to localStorage
//saved events persist when refreshing


var currentDayEl = $('#currentDay');
var containerEl = $('.container');

//get current time in hA format
var currentHour = moment().hour();

const workDayHours = [
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

//target the div that holds the time block hour
var timeBlockHour = $('col-1 hour')


//compare each time block to the current time
// - if after, if present, add class of 'future' to timeBlockEventSpace
// - if equal, add class of 'present' to timeBlockEventSpace
// - else add class of past to timeBlockEventSpace

function auditTimeBlock(timeBlockEventSpace) {
    //retrieve the hour from the div and convert it to the x'th hour of the day
    var currentTimeBlockHour = moment($(timeBlockHour).text().trim(), 'hA').hour();

    //remove class of 'past present future
    $(timeBlockEventSpace).removeClass('past present future');

    //if currentTimeBlockHour
    if (currentTimeBlockHour > currentHour) {
        $(timeBlockEventSpace).addClass('future');
    }
    else if (currentTimeBlockHour === currentHour) {
        $(timeBlockEventSpace).addClass('present');
    }
    else {
        $(timeBlockEventSpace).addClass('past');
    }
}

//add time blocks for each hour (3 columns in 9 rows: 9AM to 5PM) format for 9AM is hA
for (var i = 0; i < workDayHours.length; i++) {

    //add div with class row
    var timeBlockRow = $('<div>')
        .addClass('row time-block')

    // add 1 div with class hour
    var timeBlockHour = $('<div>')
        .addClass('col-1 hour')
        .text(workDayHours[i])

    var timeBlockEventSpace = $('<div>')
        .addClass('col-10')
        .attr({
            id: 'Hour-' + i
        });

    //adds in description of the schedule
    var userInput = $('<p>')
        .addClass('description')
        .text(' ');
        
    //check time
    auditTimeBlock(timeBlockEventSpace);

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
    $(timeBlockEventSpace).append(userInput);
}


$('.col-10').on('click', 'p', function () {
    //logs the click to check functionality
    console.log('clicked');

    var text = $(this)
        .text()
        .trim()

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger('focus');
});

$('.col-10').on('blur', 'textarea', function () {
    var text = $(this)
        .val()
        .trim();

        var userTextP = $("<p>")
        .addClass("description")
        .text(text);


    $(this).replaceWith(userTextP);
})