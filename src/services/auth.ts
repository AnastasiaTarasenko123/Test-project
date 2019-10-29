import Firebase from '../firebase/Firebase'

export const registration = (
    firebase: Firebase,
    firstName: string,
    email: string,
    password: string,
    successcallback?: (user: firebase.auth.UserCredential) => void,
    errorcallback?: (error: any) => void
) => {
    firebase.doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => (
            firebase.user(authUser.user!.uid)
                .set({
                    firstName: firstName,
                    email: email
                })
        ))
        .then(authUser => {
            successcallback && successcallback(authUser)
        })
        .catch(error => {
            errorcallback && errorcallback(error)
        });
}

export const login = (
    firebase: Firebase,
    email: string,
    password: string,
    successcallback?: (user: firebase.auth.UserCredential) => void,
    errorcallback?: (error: any) => void
) => {
    firebase.doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
            successcallback && successcallback(authUser)
        })
        .catch(error => {
            errorcallback && errorcallback(error)
        });
}