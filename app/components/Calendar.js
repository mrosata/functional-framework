"use strict"

import dom from '../utils/dom';

export default (state) => {
  return (
    <div id= "calendar" />
  )
}
// function loaded(){
//   console.log("Here");
//   $('#calendar').fullCalendar({
//     // put your options and callbacks here
//   });
// }
$(document).ready(function() {
    // page is now ready, initialize the calendar...
    $('#calendar').fullCalendar({
      header: { right: 'month,agendaWeek,agendaDay' }, // buttons for switching between views

      dayClick: function() {
        console.log('a day has been clicked!');
        // $('#calendar').fullCalendar( 'changeView', 'basicDay' )
    }
        // put your options and callbacks here
    })
});
