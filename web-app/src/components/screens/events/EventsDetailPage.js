import React, {useEffect} from 'react'
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Comments from "../comments/Comments";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {connect, useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import defaultImg from "../../../assets/Default Image.png"
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBarHeader from "../../nav/AppBarHeader";
import {storage} from "firebase";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import {addMembers, signupMembers} from "../../../redux/actions/memberActions";

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'start'
    },
    subtitle: {
        textAlign: 'start'
    },
    image: {
        margin: 20,
        width: 200,
        height: 200,
        objectFit: 'cover',
    },
    button: {
        margin: '24px 0px',
        width: 300
    }
}));

const EventsDetailPage = ({history, match, signupMembers}) => {
    const classes = useStyles();
    const eventID = match.params.eventID;
    const [eventImg, setEventImg] = React.useState(null);
    const [hasFetched, setHasFetched] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [memberInfo, setMemberInfo] = React.useState({
        email: '',
        displayName: '',
        tags: []
    });

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
    ]);

    const event = useSelector(({firestore: {data}}) => data.events && data.events[eventID]);
    const profile = useSelector(state => state.firebase.profile);
    const auth = useSelector(state => state.firebase.auth);

    useEffect(() => {
        if (eventImg === null && hasFetched === false && isLoaded(event)) {
            let img = storage().ref(`eventImages/${eventID}`);

            img.getDownloadURL()
                .then(url => {
                    setHasFetched(true);
                    setEventImg(url);
                })
                .catch(function(error) {
                    setHasFetched(true);
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                        default:
                            break;
                    }
                });
        }
    });

    if (!isLoaded(event)) {return null}

    const handleClickOpen = () => {
        if (isLoaded(auth) && isLoaded(profile) && !isEmpty(auth) && !isEmpty(profile)) {
            signupMembers(eventID, "Automated", [{
                email: profile.email,
                displayName: profile.displayName,
                isUser: true,
                uid: auth.uid,
                tags: []
            }]);
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddMemberChange = prop => event => {
        setMemberInfo({...memberInfo, [prop]: event.target.value})
    };

    const handleAddMember = () => {
        signupMembers(eventID, "Automated", [memberInfo]);
        setMemberInfo({
            email: '',
            displayName: ''
        });
    };

    let signupBtn;

    if (profile && profile.attending && profile.attending.includes(eventID)) {
        signupBtn = <Button className={classes.button} variant="contained" disableElevation >You are signed up!</Button>;
    } else {
        signupBtn = <Button className={classes.button} variant="contained" disableElevation color="primary" onClick={handleClickOpen}>Signup</Button>
    }


    return (
        <div>
            <AppBarHeader
                start={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            // TODO: don't go back if prev page was create page
                            history.goBack()
                        }}
                        color="inherit"
                        aria-label="back"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                }
                title="Event Details"
                // TODO: don't show if not the event owner
                end={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            history.push('/event/'+ eventID +'/manage')
                        }}
                        color="inherit"
                        aria-label="manage"
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <Container>
                <img className={classes.image} src={eventImg ? eventImg : defaultImg} alt=""/>
                <h2 className={classes.title}>{event.title}</h2>
                <Typography className={classes.subtitle} variant="subtitle1">{event.description}</Typography>
                {signupBtn}

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Signup for ...</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your information to join this event
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                            value={memberInfo.email}
                            onChange={handleAddMemberChange('email')}
                        />
                        <TextField
                            margin="dense"
                            id="displayName"
                            label="Full Name"
                            type="name"
                            fullWidth
                            value={memberInfo.displayName}
                            onChange={handleAddMemberChange('displayName')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            handleAddMember();
                            handleClose();
                        }} color="primary">
                            Signup
                        </Button>
                    </DialogActions>
                </Dialog>

                <Typography className={classes.subtitle} variant="subtitle1">Comments</Typography>
                <Comments eventID={eventID}/>
            </Container>
        </div>

    );
};

const mapDispatch = {
    signupMembers: signupMembers,
}

export default connect(undefined, mapDispatch)(EventsDetailPage)