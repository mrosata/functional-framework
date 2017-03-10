import momentjs from 'moment';

const calendars = [
  ['bdnha1319u329g6gsr6rcksg6c@group.calendar.google.com', 'The Library'],
  ['led1grg2f8jtbtdrks7hv125fo@group.calendar.google.com', 'Cesar Chavez Room'],
  ['353tn8hvjnrtja3h21gbjgaigo@group.calendar.google.com', 'Rosa Parks Room'],
  ['t0gnqindnl5hfu7noj4iu3dvek@group.calendar.google.com', 'Nelson Mandela']
]


function getEventsFromGoogle(calendarId) {
  return new Promise((resolve, reject) => {
    const request = gapi.client.calendar.events.list({
      'calendarId':   calendarId,
      'timeMin':      (new Date()).toISOString(),
      'singleEvents': true,
      'maxResults':   100,
      'orderBy':      'startTime'
    });

    request.execute(function (resp) {
      return resp ? resolve(resp) : reject(resp);
    });
  });
}


const ourAPI = {
  calendars: null,

  getEvents() {
    return new Promise((resolve, reject) => {
      !this.calendars ? reject(null) : resolve(this.calendars.then(cals => cals.reduce((acc, cal) => [].concat(acc, cal.items), [])));
    })
  },

  /**
   * Only call this if the events aren't loaded (they probably are, they get
   * called when this module loads)
   */
  loadEvents() {
    ourAPI.calendars = window.gapiPromise.then(() => {
      return new Promise(function (resolve, reject) {
        // Have to load the calendar API First
        gapi.client.load('calendar', 'v3', function () {
          const gapiEventPromises = calendars
            .map(calPair => calPair[0])
            .map(getEventsFromGoogle);

          Promise.all(gapiEventPromises)
            .then(resolve, reject);

        });
      });
    });
  }
}

// initial loading of events
ourAPI.loadEvents();

export default ourAPI;
