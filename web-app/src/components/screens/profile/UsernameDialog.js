import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

export default function UsernameDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSubmitted(false);
        setPwSubmitted(false);
        setPwAccepted(false);
    };

    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
    }

    const [pwSubmitted, setPwSubmitted] = React.useState(false);

    const [pwAccepted, setPwAccepted] = React.useState(false);

    const handlePwSubmit = () => {
        setPwSubmitted(true);
        setPwAccepted(true);
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
                <DialogTitle id="form-dialog-title">Change Username</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="text"
                        fullWidth
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

            {submitted && pwSubmitted && pwAccepted &&
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