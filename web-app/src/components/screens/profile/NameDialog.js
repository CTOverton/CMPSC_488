import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {changeName, checkPassword} from "../../../redux/actions/authActions";

export default function NameDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSubmitted(false);
        setPwSubmitted(false);
        setPwAccepted(false);
        setNewFirstName("");
        setNewLastName("");
        setPassword("");
    };

    const [newFirstName, setNewFirstName] = React.useState("")

    const handleNewFirstName = (e) => {
        setNewFirstName(e);
    }

    const [newLastName, setNewLastName] = React.useState("")

    const handleNewLastName = (e) => {
        setNewLastName(e);
    }

    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
    }

    const [password, setPassword] = React.useState("")

    const handlePassword = (e) => {
        setPassword(e);
    }

    const [pwSubmitted, setPwSubmitted] = React.useState(false);

    const [pwAccepted, setPwAccepted] = React.useState(false);

    const handlePwSubmit = () => {
        setPwSubmitted(true);
        if(checkPassword(password)) {
            setPwAccepted(true);
            changeName(newFirstName, newLastName);
        }
    }

    const handlePwResubmit = () => {
        setPwSubmitted(false);
    }

    return(
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Change Name
            </Button>

            {!submitted &&
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change Name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New First Name"
                        type="text"
                        fullWidth
                        onChange={handleNewFirstName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New Last Name"
                        type="text"
                        fullWidth
                        onChange={handleNewLastName}
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
                <DialogTitle id="form-dialog-title">Change Name</DialogTitle>
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

            {submitted && pwSubmitted && !pwAccepted &&
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change Name</DialogTitle>
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

            {submitted && pwSubmitted && pwAccepted &&
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Success!<br/>Your name has been changed.
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