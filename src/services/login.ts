import Firebase from "../firebase/Firebase";

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