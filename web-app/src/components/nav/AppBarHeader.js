import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {logoutUser} from "../../redux/actions/authActions";
import {connect} from "react-redux";

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

const AppBarHeader = ({logout}) => {
    const classes = useStyles();

    const handleLogout = () => {
        logout()
    }

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
{/*                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>*/}
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

export default connect(undefined, mapDispatch)(AppBarHeader)