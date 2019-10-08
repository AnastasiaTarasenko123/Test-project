import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App'
import Firebase from './components/Firebase/Firebase'
import { FirebaseContext } from './components/Firebase/FirebaseContext'

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root'));


