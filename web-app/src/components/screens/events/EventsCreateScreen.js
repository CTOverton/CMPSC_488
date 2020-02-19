import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {createEvent, deleteEvent, updateEvent} from "../../../redux/actions/eventActions";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";

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

const EventsCreateScreen = ({createEvent, updateEvent, deleteEvent}) => {
    const classes = useStyles();
    const [event, setEvent] = React.useState({
        title: null,
        description: null,
    })

    const handleChange = prop => e => {
        const value = e.target.value;
        setEvent({ ...event, [prop]: value === "" ? null : value })
    }

    const handleCreateEvent = () => {
        // Todo: on successful create redirect user to event page
        createEvent(event)
    }

    return (
        <Container maxWidth="md">
            <h1>Event Details</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="title-input"
                    label="Title"
                    variant="filled"
                    onChange={handleChange('title')}
                />
                <TextField
                    id="description-input"
                    label="Description"
                    variant="filled"
                    onChange={handleChange('description')}
                />
            </form>
            <Button className={classes.margin} variant="contained" disableElevation color="primary" onClick={handleCreateEvent}>Create Event</Button>
        </Container>
    )
}

const mapState = state => {return {events: state.events}}
const mapDispatch = {createEvent: createEvent, updateEvent: updateEvent, deleteEvent: deleteEvent}

export default connect(mapState, mapDispatch)(EventsCreateScreen)