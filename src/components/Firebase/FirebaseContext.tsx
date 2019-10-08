import React from 'react';
import Firebase from './Firebase';


const FirebaseContext: React.Context<null | Firebase> = React.createContext<null | Firebase>(null);

export const withFirebase = (Component:any) => (props:any) => {
    <FirebaseContext.Consumer>
       {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>;
};

export {FirebaseContext};