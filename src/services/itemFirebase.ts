import Firebase from '../firebase/Firebase'
import { ReadApplication } from '../interfaces/interfaces'

export const createItem = (name: 'applications' | 'categories' | 'stops', firebase: Firebase, item: any) => {
    let ref = firebase[name]();
    if (ref !== null)
        ref.push({
            ...item
        })
}

export const readItem = (
    firebase: Firebase,
    id: string,
    child: string,
    successfunction?: (result: any) => void,
    emptyfunction?: () => void) => {
    firebase.db.ref().child(child)
        .orderByKey()
        .equalTo(id)
        .on('value', snapshot => {
            const appObject = snapshot.val();
            if (appObject) {
                const appList: ReadApplication[] = Object.keys(appObject).map(key => ({
                    ...appObject[key],
                    uid: key,
                }
                ));
                if (appList.length > 0) {
                    successfunction && successfunction(appList[0]);
                }
            } else {
                emptyfunction && emptyfunction();
            }
        });
}

export const readItems = (
    firebase: Firebase,
    appId: string,
    child: string,
    successfunction?: (result: any) => void,
    emptyfunction?: () => void) => {
    const ref: firebase.database.Reference = firebase.db.ref().child(child);
    let ordered: firebase.database.Query = ref;
    if (child === 'applications') {
        ordered = appId === '' ? ordered.orderByChild('userID') : ordered.orderByKey().equalTo(appId);
    }
    else {
        ordered = ordered.orderByChild('appID').equalTo(appId);
    }
    ordered.on('value', snapshot => {
        const appObject = snapshot.val();
        if (appObject) {
            const appList: ReadApplication[] = Object.keys(appObject).map(key => ({
                ...appObject[key],
                uid: key,
            }
            ));
            if (appList.length > 0) {
                successfunction && successfunction(appList);
            }
        } else {
            emptyfunction && emptyfunction();
        }
    });
}

export const update = (
    name: 'application' | 'category' | 'stop',
    firebase: Firebase,
    uid: string,
    key: any,
    value: any
) => {
    firebase[name](uid).update({ [key]: value });
}

export const deleteItem = (
    firebase: Firebase,
    name: 'application' | 'category' | 'stop',
    uid: string
) => {
    firebase[name](uid).remove();
}
