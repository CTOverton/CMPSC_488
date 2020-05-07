import React from "react";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteEvent, updateEvent} from "../../../redux/actions/eventActions";
import AppBarHeader from "../../nav/AppBarHeader";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        width: '100%',
        maxWidth: 300
    }
}))

const EventsSettingsPage = ({updateEvent, deleteEvent, history, match}) => {
    const classes = useStyles();
    const eventID = match.params.eventID;

    return (
        <div>
            {/* region Header*/}
            <AppBarHeader
                start={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            history.goBack()
                        }}
                        color="inherit"
                        aria-label="back"
                    >
                        <ArrowBackIosIcon/>
                    </IconButton>
                }
                title="Event Settings"
            />
            {/* endregion */}
            <Container maxWidth="md" className={classes.root}>
                <Button onClick={() => {
                    deleteEvent(eventID)
                    history.push("/events")
                }} className={classes.button} variant="contained" disableElevation>Delete Event</Button>
            </Container>
        </div>

    )
}

const mapDispatch = {updateEvent: updateEvent, deleteEvent: deleteEvent}

export default connect(undefined, mapDispatch)(withRouter(EventsSettingsPage))