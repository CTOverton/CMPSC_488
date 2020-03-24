import React from "react";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteEvent, updateEvent} from "../../../redux/actions/eventActions";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}))

const EventsSettingsPage = ({eventID, updateEvent, deleteEvent, history}) => {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <h1>Event Settings</h1>
{/*            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div>
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
                </div>

                <Button className={classes.margin} variant="contained" disableElevation color="primary" type="submit">Create Event</Button>
            </form>*/}
            <Link to={"/events/" + eventID + "/signup"} style={{textDecoration: "none"}}><Button className={classes.margin} variant="contained" color="primary" disableElevation>View Signup Page</Button></Link>
            <Button onClick={() => {
                deleteEvent(eventID)
                history.push("/events")
            }} className={classes.margin} variant="contained" color="secondary" disableElevation>Delete Event</Button>
        </Container>
    )
}

const mapState = (state, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        eventID: id
    }
}

const mapDispatch = {updateEvent: updateEvent, deleteEvent: deleteEvent}

export default connect(mapState, mapDispatch)(withRouter(EventsSettingsPage))