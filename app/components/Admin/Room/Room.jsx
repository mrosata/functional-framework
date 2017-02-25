"use strict"
import dom from '../../../utils/dom';
import { dispatch, dispatchAsync } from '../../../index'
import { auth } from '../../../utils/firebase-app'

import Room from './room-class.js'
import RoomDetail from './RoomDetail'
import RoomList from './RoomList'



/**
 * currentUser property will return a user object or null depending on if the user is authenticated or not.
 */
var user = auth.currentUser;




/**
 * This event will fire whenever the authentication state changes.
 * The function will return either a populated firebaseUser if the user is authenicated
 * or null if the user is not authenticate.
 */
auth.onAuthStateChanged(firebaseUser => {
    const btnSignIn = document.getElementById('sign-in-with-popup');
    const btnLogOut = document.getElementById('btn-logout');

    if (!btnLogOut)
        return;

    if (firebaseUser) {
        btnSignIn.classList.add('hide');
        btnLogOut.classList.remove('hide');
    }
    else {

        btnSignIn.classList.remove('hide');
        btnLogOut.classList.add('hide');
    }
});

function logout() {
    auth.signOut().then(function () {
        console.log('logout success');
    }, function (error) {
        console.log('logout error', error);
    });


    //auth.signOut();
}

var signInWithPopup = function () {
    window.open('/widget.html', 'Sign In', 'width=985,height=735');
};

export default ({state, dispatch}) => {
    return (
        <div>
            <button className="btn btn-info" id="sign-in-with-popup" onclick={() => signInWithPopup()}>Sign In</button>
            <button className="btn btn-info hide" id="btn-logout" onclick={() => logout()}>Log Out</button>
            <RoomDetail state={state} />
            <RoomList state={state} />
        </div>
    );
}