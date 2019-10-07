import React from 'react';
import Firebase from './Firebase';

const FirebaseContext: React.Context<null> | React.Context<Firebase> = React.createContext(null);

export {FirebaseContext};