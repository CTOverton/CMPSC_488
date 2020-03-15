import React from "react";
import {Container} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import {useParams} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useFirestore} from "react-redux-firebase";

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

const AttendeesAdd = () => {
    const classes = useStyles();
    const [inputs, setInputs] = React.useState({
        email: null,
        firstName: null,
        lastName: null
    })
    const firestore = useFirestore()
    const { eventID } = useParams();

    const handleChange = prop => e => {
        const value = e.target.value;
        setInputs({ ...inputs, [prop]: value === "" ? null : value })
    }

    const handleAdd = () => {
        firestore
            .collection('events')
            .doc(eventID)
            .collection('attendees')
            .doc(inputs.email)
            .set(inputs)
            .then(doc => console.log("attendee added with " + doc))
            .catch(err => console.log(err))
    }

    return (
        <Container maxWidth="md">
            <h1>Add Attendee</h1>
            <form className={classes.root} noValidate autoComplete="off">
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
                <div>
                    <Button className={classes.margin} variant="contained" disableElevation color="primary" onClick={handleAdd}>Add Attendee</Button>
                </div>


            </form>
        </Container>
    )
}

export default AttendeesAdd