import Firebase from '../firebase/Firebase'
import { ReadApplication } from '../interfaces/interfaces'


export const createItem = (nameItem: string, firebase: Firebase, item: any) => {
    let ref = null;
    switch (nameItem) {
        case 'applications': ref = firebase.applications(); break;
        case 'stops': ref = firebase.stops(); break;
        case 'categories': ref = firebase.categories(); break;
    }

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
                if (appList !== undefined) {
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
    let ref: firebase.database.Reference = firebase.db.ref().child(child);
    let ordered: firebase.database.Query = ref;
    if (child === 'applications')
        ordered = appId === '' ? ordered.orderByChild('userID') : ordered.orderByKey().equalTo(appId);
    else
        ordered = ordered.orderByChild('appID').equalTo(appId);
    ordered.on('value', snapshot => {
        const appObject = snapshot.val();
        if (appObject) {
            const appList: ReadApplication[] = Object.keys(appObject).map(key => ({
                ...appObject[key],
                uid: key,
            }
            ));
            if (appList !== undefined) {
                successfunction && successfunction(appList);
            }
        } else {
            emptyfunction && emptyfunction();
        }
    });
}

export const update = (
    nameItem: string,
    firebase: Firebase,
    uid: string,
    key: any,
    value: any
) => {
    switch(nameItem) {
        case 'application': firebase.application(uid).update({ [key]: value } ); break;
        case 'category': firebase.category(uid).update({ [key]: value } ); break;
        case 'stop': firebase.stop(uid).update({ [key]: value } ); break;
    }
};
