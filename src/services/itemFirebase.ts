import Firebase from '../firebase/Firebase'
import { Application, ReadApplication } from '../interfaces/interfaces'


export const createItem = (nameItem: string, firebase: Firebase, item: any) => {
    let ref = null;
    switch (nameItem) {
        case 'applications': ref = firebase.applications(); break;
        case 'stops': ref = firebase.stops(); break;
    }

    if (ref !== null)
        ref.push({
            ...item
        })
}

export const readApp = (
    firebase: Firebase,
    appId: string,
    successfunction?: (result: any) => void,
    emptyfunction?: () => void) => {
    let ref: firebase.database.Reference = firebase.db.ref().child('applications');
    let ordered = appId === '' ? ref.orderByChild('userID') : ref.orderByKey().equalTo(appId);
    ordered.on('value', snapshot => {
        const appObject = snapshot.val();
        if (appObject) {
            const appList: ReadApplication[] = Object.keys(appObject).map(key => ({
                ...appObject[key],
                uid: key,
            }
            ));
            if (appList !== undefined) {
                if (appList.length === 1)
                    successfunction && successfunction(appList[0]);
                else
                    successfunction && successfunction(appList);
            }
        } else {
            emptyfunction && emptyfunction();
        }
    });
}

export const updateApp = (
    firebase: Firebase,
    uid: string,
    key: any,
    value: any
) => {
    firebase.application(uid).update(
        { [key]: value }
    );
};


