import app, { auth } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { config } from '../constants/config'

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
  users = () => this.db.ref("users");

  application = (uid: any) => this.db.ref(`applications/${uid}`);
  applications = () => this.db.ref("applications");
}

export default Firebase