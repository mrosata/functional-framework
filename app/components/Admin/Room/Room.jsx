"use strict"
import dom from '../../../utils/dom';
import { dispatch, dispatchAsync } from '../../../index'
import { auth } from '../../../utils/firebase-app'

import RoomDetail from './RoomDetail'
import RoomList from './RoomList'

import GoogleAuthButton from '../../GoogleAuthButton'

export default ({state, dispatch}) => {
  return (
    <div>
      <GoogleAuthButton state={state}/>
      <RoomDetail state={state} />
      <RoomList state={state} />
    </div>
  );
}
