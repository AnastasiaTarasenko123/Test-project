import React from 'react'
import { withFirebase } from '../../firebase/FirebaseContext'
import Firebase from '../../firebase/Firebase'
import './Applications.scss'
import { ReadApplication } from '../../interfaces/interfaces'
import { AuthUserContext } from '../Session/SessionContext'
import { readItems } from '../../services/itemFirebase'
import { Button, Card, CardActionArea, CardContent, CardActions, CardMedia } from '@material-ui/core'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routs'

interface IProps {
    firebase: Firebase,
}

interface IState {
    applications: ReadApplication[]
}

interface IListApplications {
    applications: ReadApplication[]
}

class Applications extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            applications: [],
        }
    }

    componentDidMount = () => {
        readItems(this.props.firebase, '', 'applications', (value: ReadApplication[]) => { this.setState({ applications: value }) },
            () => { this.setState({ applications: [] }) });
    }

    componentWillUnmount() {
        this.props.firebase.applications().off();
    }

    render() {
        const { applications } = this.state;
        return (
            applications.length > 0 ? (
                <div className="list-apps">
                    <ApplicationList applications={applications} />
                </div>)
                :
                (
                    <>
                        <p>No applications yet.</p>
                    </>
                )
        );
    }
}

const ApplicationList: React.FC<IListApplications> = ({ applications }) => {
    return (
        <AuthUserContext.Consumer>
            {(authUser: any) => (
                applications.map(application => (
                    application.userID === authUser!.uid ? (<ApplicationItem key={application.uid} application={application} />) : ('')
                ))
            )}
        </AuthUserContext.Consumer>
    )
}

const ApplicationItem: React.FC<any> = ({ application }) => (
    <Card className="item-app">
        <CardActionArea>
            {application.picture !== '' &&
                <CardMedia
                    component="img"
                    alt="Application"
                    height="300"
                    image={application.picture}
                />}
        </CardActionArea>
        <CardContent>
            <p>{application.appName}</p>
        </CardContent>
        <CardActions>
            <Link to={`${ROUTES.EDITOR}/${application.uid}${ROUTES.APP_INFO}`}>
                <Button variant="outlined" color="default" className="btnEdit">App Edit</Button>
            </Link>
        </CardActions>
    </Card >
)

export const Application = withFirebase(Applications)