import Firebase from '../firebase/Firebase'
import { Application, ReadApplication } from '../interfaces/interfaces'


export const createApp = (firebase: Firebase, app: Application) => {
    firebase.applications().push({
        userID: app.userID,
        appName: app.appName,
        picture: app.picture,
        color: app.color,
        description: app.description,
        selectedPlace: app.selectedPlace,
        isCategories: app.isCategories,
        isGPS: app.isGPS,
    })
}

export const readApps = (
    firebase: Firebase,
    successfunction?: (result: ReadApplication[]) => void,
    emptyfunction?: () => void) => {
    firebase.db.ref().child('applications')
        .orderByChild('userID')
        .on('value', snapshot => {
            const appObject = snapshot.val();
            if (appObject) {
                const appList: ReadApplication[] = Object.keys(appObject).map(key => {
                    return {
                        ...appObject[key],
                        uid: key,
                    }
                });
                if (appList !== undefined)
                    successfunction && successfunction(appList);
            } else {
                emptyfunction && emptyfunction();
            }
        });
}

export const readApp = (
    firebase: Firebase,
    uid: string,
    successfunction?: (result: ReadApplication) => void,
    emptyfunction?: () => void) => {
    firebase.db.ref().child('applications')
    .orderByKey()
    .equalTo(uid)
    .on('value', snapshot => {
            const appObject = snapshot.val();
            if (appObject) {
                const appList: ReadApplication[] = Object.keys(appObject).map(key => {
                    return {
                        ...appObject[key],
                        uid: key,
                    }
                });
                if (appList !== undefined)
                    successfunction && successfunction(appList[0]);
            } else {
                emptyfunction && emptyfunction();
            }
        });
}

// componentDidMount() {
//     const { uid } = this.state;
//     console.log(uid);
//     this.props.firebase.db.ref().child('applications')
//         .orderByKey()
//         .equalTo(uid)
//         .on('value', snapshot => {
//             const appObject = snapshot.val();
//             if (appObject) {
//                 const appList: ReadApplication[] = Object.keys(appObject).map(key => {
//                     return {
//                         ...appObject[key],
//                         uid: key,
//                     }
//                 });
//                 if (appList !== undefined) {
//                     this.setState({
//                         myApp: appList[0]
//                     })
//                 }
//             }
//         });
// }
