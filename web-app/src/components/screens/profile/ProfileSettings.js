import React from "react";
import {useSelector} from "react-redux";
import {isEmpty, isLoaded} from "react-redux-firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import {changeUsername} from "../../../redux/actions/authActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import UsernameDialog from "./UsernameDialog";

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

function ProfileSettings() {
    const classes = useStyles();

    const [newUsername, setNewUsername] = React.useState(null)

    const profile = useSelector(state => state.firebase.profile);

    const credentials = {
        email: profile.email,
        password: profile.password
    }

    const handleChangeUsername = () => {
        changeUsername(credentials, profile, newUsername);
    }

    console.log(profile);

    if (!isLoaded(profile)) {
        return null;
    }

    if (isEmpty(profile)) {
        return (
            <h1>Not logged in</h1>
        )
    }

    return(
        <div>
            <h1>Settings</h1>
            {/*<form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="update-username-input"
                    label="New Username"
                    variant="filled"
                    onChange={setNewUsername}
                    />
                <Button className={classes.margin} variant="contained" disableElevation color="primary" onClick={handleChangeUsername}>Change Username</Button>
            </form>*/}
            <UsernameDialog/>
        </div>
    );

}

export default ProfileSettings;