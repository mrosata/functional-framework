# Calendar App

Run `yarn install` or `npm install` to setup.

Then `yarn bower -- install` or `npm run bower install`

Finally, `yarn serve` or `npm run serve` to live serve your work

For docs `yarn doc` or `npm run doc` (they generate into docs folder, but you can also just read them inline as you code).


Added in a firebaseApp module that will setup firebase
```javascript
// Keep in mind the relative path
import firebaseApp from './utils/firebase-app'

// Now you should have the firebase.database() reference:
firebaseApp.database.ref('events')

// There is also an alias firebase.auth() === firebaseApp.auth but we don't need that atm
```
