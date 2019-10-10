import React from 'react'

const AuthUserContext: React.Context<null | React.ReactElement > = React.createContext<null | React.ReactElement>(null);

export { AuthUserContext };