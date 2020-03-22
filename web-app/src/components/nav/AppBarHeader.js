import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {createUser, logoutUser} from "../../redux/actions/authActions";
import {connect} from "react-redux";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import EventIcon from "@material-ui/icons/Event";
import {Link, Redirect, withRouter} from "react-router-dom";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const AppBarHeader = ({logout, history}) => {
    const classes = useStyles();

    const handleLogout = () => {
        logout()
    }

    const handleSettings = () => {
        history.push("/profile/settings");
    }

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
{/*                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>*/}
                    <Button color='inherit' onClick={handleSettings}>Settings</Button>
                    <Typography variant="h6" className={classes.title}>
                        Title
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

// const mapState = state => {return {auth: state.auth}}
const mapDispatch = {logout: logoutUser}

export default connect(undefined, mapDispatch)(withRouter(AppBarHeader))