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

//declare variable for task
var task = $('.description')
//empty object
var tasks = {};

//compare timeblock to current time to assign colour codes
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

//loads tasks from save
function loadTask() {

    for (var i = 0; i < workDayHours.length; i++) {
        let task = localStorage.getItem(workDayHours[i])

        if (task) {
            $('#' + (i + 9)).siblings().first().children().text(task);
        }
    }
}
// create function to save task
function saveTask(hour, task) {
    localStorage.setItem(hour, task);
}

//add time blocks for each hour (3 columns in 9 rows: 9AM to 5PM) format for 9AM is hA
for (var i = 0; i < workDayHours.length; i++) {

    //add div with class row
    var timeBlockRow = $('<div>')
        .addClass('row time-block')
        .attr({
            id: 'row-' + (i + 9)
        })

    // add 1 div with class hour
    var timeBlockHour = $('<div>')
        .addClass('col-1 hour')
        .text(workDayHours[i])
        .attr({
            id: i + 9
        })

    var timeBlockEventSpace = $('<div>')
        .addClass('col-10')
        .attr({
            id: 'time-block-' + (i + 9)
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
            id: 'save-button-' + (i + 9),
            type: 'button',
        })

        //function upon clicking save btn to save to storage
    .on('click', function () {
        var hour = $(this).siblings().first().text();
        // retrieve the value in <p> element
        var task = $(this).siblings().last().text();

        saveTask(hour, task)

        console.log(hour);
        console.log(task);
    })

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


//cick timeblock to edit text content
$('.col-10').on('click', 'p', function () {

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

loadTask();