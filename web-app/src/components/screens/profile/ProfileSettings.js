import React from "react";
import {useSelector} from "react-redux";
import {isEmpty, isLoaded} from "react-redux-firebase";
import UsernameDialog from "./Dialogs/UsernameDialog";
import AppBarHeader from "../../nav/AppBarHeader";


function ProfileSettings() {

    //const [newUsername, setNewUsername] = React.useState(null)

    const profile = useSelector(state => state.firebase.profile);
/*
    const credentials = {
        email: profile.email,
        password: profile.password
    }

    const handleChangeUsername = () => {
        changeUsername(credentials, profile, newUsername);
    }
*/
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
            <AppBarHeader title="Settings" />
            {/*<form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="update-username-input"
                    label="New Username"
                    variant="filled"
                    onChange={setNewUsername}
                    />
                <Button className={classes.margin} variant="contained" disableElevation color="primary" onClick={handleChangeUsername}>Change Username</Button>
            </form>*/}
            <br/>
            <UsernameDialog/>
        </div>
    );
}

export default ProfileSettings;