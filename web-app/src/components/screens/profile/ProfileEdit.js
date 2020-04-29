import React, {useEffect} from 'react'
import IconButton from "@material-ui/core/IconButton";
import AppBarHeader from "../../nav/AppBarHeader";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {connect, useSelector} from "react-redux";
import {isEmpty, isLoaded} from "react-redux-firebase";
import {updateAvatar, updateProfileDetails} from "../../../redux/actions/userActions";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {storage} from "firebase";
import defaultImg from "../../../assets/Default Image.png";
import {DropzoneDialog} from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    form: {
        maxWidth: 400,
        margin: 'auto',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
    inputs: {
        margin: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        width: '100%',
        maxWidth: 300
    },
    image: {
        margin: 20,
        width: 100,
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
}));

const ProfileEdit = ({updateProfile, updateAvatar, history}) => {
    const classes = useStyles();

    const profile = useSelector(state => state.firebase.profile);
    const auth = useSelector(state => state.firebase.auth);

    const [avatarImg, setAvatarImg] = React.useState({
        file: null,
        display: null
    });
    const [uploadOpen, setUploadOpen] = React.useState(false);

    useEffect(() => {
        if (!avatarImg.display && isLoaded(auth) && !isEmpty(auth)) {
            let img = storage().ref(`userAvatarImages/${auth.uid}`);

            img.getDownloadURL()
                .then(url => {
                    setAvatarImg({...avatarImg, display: url});
                })
                .catch(function(error) {
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

    if(!isLoaded(profile) || !isLoaded(auth)){
        return null
    }

    if(isEmpty(profile)){
        return <h1>Not logged in</h1>
    }

    const handleFileChange = uploads => {
        setAvatarImg({
            file: uploads[0],
            display: URL.createObjectURL(uploads[0])
        });

        updateAvatar(uploads[0]);
        setUploadOpen(false);
    };

    return (
        <div>
            <AppBarHeader
                start={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            history.goBack()
                        }}
                        color="inherit"
                        aria-label="cancel"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                }
                title="Edit Profile"
                /*
                TODO: this
                end={
                    <IconButton
                        edge="end"
                        onClick={handleSubmit}
                        color="inherit"
                        aria-label="done"
                    >
                        <CheckIcon />
                    </IconButton>
                }*/
            />

            <img className={classes.image} src={avatarImg.display ? avatarImg.display : defaultImg} alt=""/>
            <Button className={classes.button} variant="contained" disableElevation color="primary" onClick={() => setUploadOpen(true)}>Change Profile Photo</Button>
            <Button className={classes.button} variant="contained" disableElevation onClick={() => setAvatarImg(null)}>Remove Image</Button>

            <DropzoneDialog
                open={uploadOpen}
                onSave={handleFileChange}
                filesLimit={1}
                acceptedFiles={['image/jpeg', 'image/png']}
                dropzoneText={"Upload Profile Image"}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={() => setUploadOpen(false)}
                submitButtonText={'Upload'}
            />

            <ProfileInputs
                profile={{
                    username: profile.username,
                    displayName: profile.displayName
                }}
                onSubmit={(details) => {
                    updateProfile(details);
                    history.push('/profile');
                }}
                history={history}/>
        </div>
    );
};

const ProfileInputs = ({profile, onSubmit}) => {
    const classes = useStyles();
    const [inputs, setInputs] = React.useState(() => ({
        displayName: profile.displayName,
        username: profile.username,
    }));

    const handleSubmit = () => {
        onSubmit(inputs);
    };

    const handleChange = prop => e => {
        setInputs({ ...inputs, [prop]: e.target.value })
    };

    return (
        <form className={classes.form} noValidate autoComplete="off">
            <div className={classes.inputs}>
                <TextField
                    id="username-input"
                    label="Username"
                    variant="filled"
                    onChange={handleChange('username')}
                    value={inputs.username}
                    required
                />
                <TextField
                    id="displayName-input"
                    label="Name"
                    autoComplete="name"
                    variant="filled"
                    onChange={handleChange('displayName')}
                    value={inputs.displayName}
                    required
                />
            </div>

            <Button className={classes.button} variant="contained" disableElevation onClick={handleSubmit}>Save Changes</Button>
        </form>
    );
};

const mapDispatch = {updateProfile: updateProfileDetails, updateAvatar: updateAvatar};

export default connect(undefined, mapDispatch)(ProfileEdit)