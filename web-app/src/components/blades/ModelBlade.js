import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import React from "react";


function ModelBlade({title, content, actions}) {
    const [open, handleOpen] = React.useState(false);

    const handleDialogClose = () => {
        handleOpen(false);
    };
    const handleDialogOpen = () => {
        handleOpen(true);
    }

    return (
        <>
            <Button variant="contained" disableElevation={true} onClick={handleDialogOpen}>Import CSV</Button>
            <Dialog open={open}
                    onClose={handleDialogClose}
                    aria-labelledby="form-dialog-title"
                    fullScreen={useMediaQuery(useTheme().breakpoints.down('sm'))}
            >
                <DialogTitle id="dialog-title">{title}</DialogTitle>
                <DialogContent>
                    {content}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" disableElevation={true} onClick={handleDialogClose}>Close</Button>
                    {actions}
                </DialogActions>
            </Dialog>

        </>
    )

}

export default ModelBlade