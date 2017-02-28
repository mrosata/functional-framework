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

function renderCalendar() {
    let succeed = false;
    while (succeed == false) {
        let ele = $('#calendar');
        if (ele.length > 0) {
            succeed = true;
            $('#calendar').fullCalendar({
                header: {
                    right: 'month,agendaWeek' ,
                    left: 'prev,next',
                    center: 'title'
                }, // buttons for switching between views

                dayClick: function () {
                    log('a day has been clicked!');
                }
            });
        }
    }
}
export default renderCalendar
