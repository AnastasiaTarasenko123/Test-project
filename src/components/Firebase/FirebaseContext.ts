import React from 'react';
import Firebase from './Firebase';

const FirebaseContext: React.Context<null | Firebase> = React.createContext<null | Firebase>(null);

export {FirebaseContext};