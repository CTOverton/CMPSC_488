import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from '@material-ui/icons/AddBox';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import {withRouter} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        // Todo: Fix sticky top
/*        width: "100%",
        position: 'fixed',
        top: 0*/
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const EventsDetailPageHeader = ({eventID, history}) => {
    const classes = useStyles();

    const handleSettings = () => {
        history.push("/events/" + eventID + "/settings")
    }

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Event Details
                    </Typography>
                    <IconButton edge="end" onClick={handleSettings} className={classes.menuButton} color="inherit" aria-label="add">
                        <SettingsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(EventsDetailPageHeader)