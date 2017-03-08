/**
 * Created by markgrover on 2/27/17.
 */
/*
 * This function runs a while loop to check for the calendar element to be available
 *
 * once the Jquery call returns an array with a length grater then 0
 * we can run our render function salfely and set our flag to true.
 *
 *  sources = [{source},{source}...]
 *
 * */

export const renderCalendar = function(sources = null,timeout = 1, maxTimeout = 3000) {

    if (timeout > maxTimeout) {
        return;
    }
    const $calendar = $('#calendar');
    if (!$calendar.length){
        timeout++;
        return setTimeout(renderCalendar(timeout), timeout);
    }

    $('#calendar').fullCalendar({
        //customButtons: {
        //    myCustomButton: {
        //        text: 'custom!'
        //    }
        //},
        header: {
            right: 'month,agendaWeek' ,
            left: 'prev,next',
            center: 'title'
        }, // buttons for switching between views
        googleCalendarApiKey: 'AIzaSyBF391zC2S8su_r_-zFARAoWo1ekRsgcZE',
        dayClick: function () {
            log('a day has been clicked!');
        }
    });

    populateGoogleDates(sources);
};
/*
*  check if resource is already added to calendar
*
*  newSource is the object up for comparison
*
*  returns (BOOL)
*
*  true is in currentSource Array
*  false if Not
* */
function isSource(newSource) {
    let sources = $('#calendar').fullCalendar('getEventSources');
    let calExists = false;

    if (sources.length > 0) {

        sources.forEach((source) => {
            if(newSource.calendarId === source.calendarId){
                calExists = true;
            }
        });

        return calExists;
    }
    return calExists;
}
/*
*  add new event source
*
*  source is single source object from source array
*
*
* */
function removeEventSource(source){
    if(!source.added){
        let calId = {googleCalendarId: source.calendarId};
        $('#calendar').fullCalendar('removeEventSource', calId);
   }
}

// remove event source
function addEventSource(source){
    if(source.added){
        let calId = {
            googleCalendarId: source.calendarId,
            color: source.color,
            textColor: source.textColor
        };
        $('#calendar').fullCalendar('addEventSource', calId);
    }
}

// toggleCalendars
export function toggleCalendars(source,visible){
    if(!visible){
        removeEventSource(source);
    } else {
        addEventSource(source);
    }
}
export const populateGoogleDates = function(sources){
    sources.forEach((source) => {
        if(((!isSource(source)) && (source.visible === true) && (source.added === false))){
        let calId = {
            googleCalendarId: source.calendarId,
            color: source.color,
            textColor: source.textColor
        };
        $('#calendar').fullCalendar('addEventSource', calId);
        source.added = true;
        }
    });

};
// Render Events On Navigation
export const renderEventsOnNavigate = function(sources){
    displayCalendarFilter();
};

// Toggle Button Display
export const displayCalendarFilter = function (){
    $('#input-1').checkboxpicker({
        html: true,
        offLabel: '<span class="glyphicon glyphicon-remove">',
        onLabel: '<span class="glyphicon glyphicon-ok">',
        baseCls: 'btn btn-xs'
    });
    $('#input-2').checkboxpicker({
        html: true,
        offLabel: '<span class="glyphicon glyphicon-remove">',
        onLabel: '<span class="glyphicon glyphicon-ok">',
        baseCls: 'btn btn-xs'
    });
    $('#input-3').checkboxpicker({
        html: true,
        offLabel: '<span class="glyphicon glyphicon-remove">',
        onLabel: '<span class="glyphicon glyphicon-ok">',
        baseCls: 'btn btn-xs'
    });
    $('#input-4').checkboxpicker({
        html: true,
        offLabel: '<span class="glyphicon glyphicon-remove">',
        onLabel: '<span class="glyphicon glyphicon-ok">',
        baseCls: 'btn btn-xs'
    });
};
export default { renderCalendar , populateGoogleDates, toggleCalendars}
