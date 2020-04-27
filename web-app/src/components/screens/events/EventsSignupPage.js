import React from "react";
import {Container} from "@material-ui/core";
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {connect, useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {signupForEvent} from "../../../redux/actions/eventActions";
import {withRouter} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
}))

const EventsSignupPage = ({eventID, signup, history}) => {
    const classes = useStyles();
    const [inputs, setInputs] = React.useState({
        email: null,
        firstName: null,
        lastName: null
    })

    useFirestoreConnect(() => [
        { collection: 'events', doc: eventID },
        { collection: 'events', doc: eventID, subcollections: [{ collection: 'signups' }] }
    ])

    let event = useSelector(({ firestore: { data } }) => data.events && data.events[eventID])

    console.log(event)
    if (!isLoaded(event)) {
        return null
    }
    // Todo: fix when event is updated but signups is not so page doesn't load
    if (!isLoaded(event.signups)) {
        return <p>Loading signups</p>
    }

    const signedupCount = Object.keys(event.signups).length

    const handleChange = prop => event => {
        const value = event.target.value;
        setInputs({ ...inputs, [prop]: value === "" ? null : value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(eventID, inputs, signedupCount >= event.attendeeLimit ? 'waitlist':'signups')
        history.push("/events/" + eventID + "/signup/thanks")
    }

    return (
        <Container maxWidth="md">
            <h1>Signup For {event.title}</h1>
            <h3>{event.description}</h3>
            {!(signedupCount >= event.attendeeLimit) &&
            <h2>Currently {signedupCount} / {event.attendeeLimit}</h2>
            }
            {signedupCount >= event.attendeeLimit &&
            <p>Unfortunately all spots have been filled, but if you signup now you will be on the waitlist!</p>
            }

            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="firstName-input"
                        label="First Name"
                        autoComplete="given-name"
                        variant="filled"
                        onChange={handleChange('firstName')}
                    />
                    <TextField
                        id="lastName-input"
                        label="Last Name"
                        autoComplete="family-name"
                        variant="filled"
                        onChange={handleChange('lastName')}
                    />
                    <TextField
                        id="email-input"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        variant="filled"
                        onChange={handleChange('email')}
                        required
                    />
                </div>

                <Button className={classes.margin} variant="contained" disableElevation color="primary" type="submit">Signup</Button>
            </form>
        </Container>
    )
}

const mapState = (state, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        eventID: id
    }
}

const mapDispatch = {signup: signupForEvent}

export default connect(mapState, mapDispatch)(withRouter(EventsSignupPage))