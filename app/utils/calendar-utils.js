/**
 * Created by markgrover on 2/27/17.
 */
/*
 * This function runs a while loop to check for the calendar element to be available
 *
 * once the Jquery call returns an array with a length grater then 0
 * we can run our render function salfely and set our flag to true.
 *
 * */

export const renderCalendar = function(timeout = 1, maxTimeout = 3000) {
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

    let sources = [{googleCalendarId: 'bdnha1319u329g6gsr6rcksg6c@group.calendar.google.com',
        color: '#ccceee',
        textColor: 'black' },{googleCalendarId: 'led1grg2f8jtbtdrks7hv125fo@group.calendar.google.com',
        color: '#ccddee',
        textColor: 'black'},{googleCalendarId: '353tn8hvjnrtja3h21gbjgaigo@group.calendar.google.com',
        color: '#BADA55',
        textColor: 'black'}];

    populateGoogleDates(sources);
};
//check if resource is already added to calendar
function isSource(newSource) {
    let sources = $('#calendar').fullCalendar('getEventSources');
    let calExists = false;

    if (sources.length > 0) {

        sources.forEach((source) => {
            if(newSource.googleCalendarId === source.googleCalendarId){
                calExists = true;
            }
        });

        return calExists;
    }
    return calExists;
}

// add new event source
function removeEventSource(source){
    if(isSource){
        let calId = {googleCalendarId: source.calendarId};
        $('#calendar').fullCalendar('removeEventSource', calId);
    }

}

// remove event source
function addEventSource(source){
    if(isSource){
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
        if(!isSource(source)){
            $('#calendar').fullCalendar( 'addEventSource', source );
        }
    });

};
export default { renderCalendar , populateGoogleDates, toggleCalendars}
