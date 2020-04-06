import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {changeUsername} from "../../../../redux/actions/authActions";
import {connect, useSelector} from "react-redux";

function UsernameDialog({auth, changeUsername}, dispatch) {
    const profile = useSelector(state => state.firebase.profile);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSubmitted(false);
        setPwSubmitted(false);
        //setPwAccepted(false);
        setNewUsername("");
        setPassword("");
        dispatch({type: 'REAUTHENTICATION_RESET'})
        console.log()
    };

    const [newUsername, setNewUsername] = React.useState("")

    const handleNewUsername = (e) => {
        setNewUsername(e.target.value);
    }

    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
    }

    const [password, setPassword] = React.useState("");

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const [pwSubmitted, setPwSubmitted] = React.useState(false);

    //const [pwAccepted, setPwAccepted] = React.useState(false);

    const handlePwSubmit = () => {
        console.log(password);
        setPwSubmitted(true);
        changeUsername(newUsername, {email: profile.email, password: password})
    }

    const handlePwResubmit = () => {
        setPwSubmitted(false);
    }

    return(
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Change Username
            </Button>
            {!submitted &&
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Change Username</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New Username"
                            type="text"
                            fullWidth
                            onChange={handleNewUsername}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Change
                        </Button>
                    </DialogActions>
                </Dialog>
            }

            {submitted && !pwSubmitted &&
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Input Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={handlePassword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePwSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            }

            {submitted && pwSubmitted && auth.pwAccepted != null  &&
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change Username</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Incorrect Password
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePwResubmit} color="primary">
                        Resubmit
                    </Button>
                </DialogActions>
            </Dialog>
            }

            {submitted && pwSubmitted && auth.pwAccepted == null &&
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change Username</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Success!<br/>Your username has been changed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            }
        </div>
    )
}

const mapState = state => {return {auth: state.auth}}
const mapDispatch = {changeUsername: changeUsername}

export default connect(mapState, mapDispatch)(UsernameDialog)