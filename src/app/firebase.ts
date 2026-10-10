import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { environment } from '../environments/environment';

if (firebase.apps.length === 0) {
  firebase.initializeApp(environment.firebase);
}

export default firebase;
