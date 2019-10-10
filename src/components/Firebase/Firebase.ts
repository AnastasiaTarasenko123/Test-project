import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/database'

const config = {
  apiKey: "AIzaSyAhzO1ZNgEF2Kt287qOjbEFi1cjcTDLh7M",
  authDomain: "test-project-8ff73.firebaseapp.com",
  databaseURL: "https://test-project-8ff73.firebaseio.com",
  projectId: "test-project-8ff73",
  storageBucket: "test-project-8ff73.appspot.com",
  messagingSenderId: "102358788103",
  appId: "1:102358788103:web:05f4c3745797b492dd22a2"
};

class Firebase {
  auth: app.auth.Auth;
  db: app.database.Database;
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  user = (uid: any) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

}

export default Firebase;