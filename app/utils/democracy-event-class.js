import moment from 'moment'
import {database} from './firebase-app'

/**
 * This is a placeholder for now. It can save events to firebase,
 * We are going to use Google Calendar Eventually, but we will need
 * to push pre-approved events to Firebase still.
 * however we'll likely want to add different properties to it in
 * the future. For now it's useful for mocking up the calendar.
 */
export default class DemoEvent {

  constructor(room, start, end, title = 'TBD') {
    this.room = room
    this.start = moment.isMoment(start) ? start : moment.utc(start, 'YYYY-MM-DD HH:mm')
    this.end =  moment.isMoment(end) ? end : moment.utc(end, 'YYYY-MM-DD HH:mm')
    this.title = title
    this.key = void(0)
  }

  /**
   * Firebase Reference to Events
   * @return {object}
   */
  static ref() {
    return database.ref('events')
  }


  static fromFirebaseSnapshot(fbDemoEvent) {

    if (!fbDemoEvent || typeof fbDemoEvent.val !== "function") {
      throw "DemoEvent.fromFirebaseSnapshot expects child of 'events' snapshot"
    }

    // Create the instance of Event using Firebase Snapshot
    let {room, start, end, title} = fbDemoEvent.val()
    start = moment.unix(start).utc()
    end = moment.unix(end).utc()
    const evt = new DemoEvent(room, start, end, title)

    // Set the ID (//TODO: this might be better in constructor now that data is live)
    evt.key = fbDemoEvent.key

    return evt
  }

  /**
   * Check that an object matches the signature of an event.
   * (useful for: checking type before storing to firebase)
   */
  static hasEventInfo({room, start, end, title}) {
    return typeof room === "number" &&
        moment.isMoment(start) &&
        moment.isMoment(end) &&
        typeof title === "string"
  }


  /**
   * Save Event Into Firebase
   * @param  {DemoEvent} demoEvent
   * @return {Promise}
   */
  static saveToFirebase(demoEvent) {
    //TODO: Check for ID and if has id then update not push

    const eventsRef = database.ref('events')
    let newEvent

    if (!DemoEvent.hasEventInfo(demoEvent)) {
      throw "Before Saving Event To Firebase Ensure It Has Proper Info"
    }

    const {room, start, end, title} = demoEvent

    newEvent = eventsRef.push()
    return newEvent.set({
      room,
      title,
      start: start.unix(),
      end: end.unix()
    })
  }

}
