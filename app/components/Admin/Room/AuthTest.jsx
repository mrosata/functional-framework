"use strict"

import firebase from 'firebase'

import dom from '../../../utils/dom';
import { dispatch, dispatchAsync } from '../../../index'
import { database, auth } from '../../../utils/firebase-app'


function login() {
    console.log('in login');

    let provider = new firebase.auth.GoogleAuthProvider()
    console.log(provider);

    //get DOM values
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnLogOut = document.getElementById('btnLogOut');

    const email = txtEmail.value;
    const password = txtPassword.value;

    // const promise = auth.signInWithEmailAndPassword(email, password);

    const promise = auth.signInWithRedirect(provider);

    console.log('promise', promise);

    promise.catch(e => console.log(e.message));
}

function signup() {
    console.log('in sign up');
    //get DOM values
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');

    const email = txtEmail.value;
    const password = txtPassword.value;

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
}

function logout() {
    console.log('in logout');
    auth.signOut();
}

auth.onAuthStateChanged(firebaseUser => {
    const btnLogOut = document.getElementById('btnLogOut');

    console.log('in onAuthStateChanged');
    if (firebaseUser) {
        console.log('firebaseUser', firebaseUser);

        if (btnLogOut)
            btnLogOut.classList.remove('hide');
    }
    else {
        console.log('not logged in');

        if (btnLogOut)
            btnLogOut.classList.add('hide');
    }
});

var signInWithPopup = function() {
  window.open('/widget.html', 'Sign In', 'width=985,height=735');
};

export default ({state, dispatch}) => {
    return (
        <div className="container">
            <button id="sign-in-with-popup" onclick={() => signInWithPopup()}>Sign In with Popup</button>
            <h1>In Auth Test</h1>
            <span className="btn btn-success" onclick={() => login()}>Login</span>
            <div className="container">
                <input id="txtEmail" type="email" placeholder="Email" />
                <input id="txtPassword" type="password" placeholder="Password" />
                <button id="btnLogin" className="btn btn-action" onclick={() => login()}>Log in</button>
                <button id="btnLogOut" className="btn btn-action hide" onclick={() => logout()}>Log Out</button>
                <button id="btnSignUp" className="btn btn-action" onclick={() => signup()}>Sign Up</button>
            </div>
        </div>
    );
}