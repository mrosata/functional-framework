# functional-framework

Run `yarn install` or `npm install` to setup.

Then `yarn bower -- install` or `npm run bower install`

Finally, `yarn serve` or `npm run serve` to live serve your work

For docs `yarn doc` or `npm run doc` (they generate into docs folder, but you can also just read them inline as you code).

		￼  
Added in a firebaseApp module that will setup firebase in project
￼ -```		￼ +```javascript
￼  // Keep in mind the relative path		￼  // Keep in mind the relative path
￼  import firebaseApp from './utils/firebase-app'		￼  import firebaseApp from './utils/firebase-app'
￼
If you see module "firebase" not found, try `npm install` again. Anytime switching branches it's a good idea to re-install dependencies it seems.
