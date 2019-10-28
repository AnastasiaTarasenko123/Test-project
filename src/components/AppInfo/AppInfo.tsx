import React from 'react'
import './AppInfo.scss'
import { RouteComponentProps, withRouter } from 'react-router'
import Firebase from '../../firebase/Firebase'
import { ReadApplication } from '../../interfaces/interfaces'
import { withFirebase } from '../../firebase/FirebaseContext'

interface RouteParams {
    uid: string
}

interface IProps extends RouteComponentProps<RouteParams> {
    firebase: Firebase
}

interface IState {
    uid: string,
    myApp: ReadApplication | null
}

class AppInfo extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            uid: this.props.match.params.uid,
            myApp: null
        }
    }
    componentDidMount() {
        // this.props.firebase.db.ref().child('applications')
        //     .orderByChild('uid')
        //     .equalTo('uid')
        //     .on('value', snapshot => {
        //         const appObject = snapshot.val();
        //         if (appObject) {
        //             const appList: ReadApplication[] = Object.keys(appObject).map(key => {
        //                 return {
        //                     ...appObject[key],
        //                     uid: key,
        //                 }
        //             });
        //             if (appList !== undefined)
        //                 this.setState({
        //                     myApp: appList[0]
        //                 })
        //         } else {
        //             this.setState({
        //                 myApp: null
        //             })
        //         }
        //     });
    }
    render() {
        const { uid } = this.state;
        console.log(uid);

        return (
            <div className="contentAppInfo">
                <div className="borderApp">
                    <p>App Info</p>
                </div>
                <div className="appImg">

                </div>
            </div>
        );
    }
}

export default withFirebase(withRouter(AppInfo))