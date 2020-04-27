import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import {clearDocRef, createEvent} from "../../../redux/actions/eventActions";
import {connect, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AppBarHeader from "../../nav/AppBarHeader";
import ListsList from "./lists/ListsList";
import uniqid from 'uniqid';
import TagBoard from "./tags/TagBoard";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AddIcon from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import {DropzoneDialog} from "material-ui-dropzone";
import defaultImg from "../../../assets/Default Image.png";

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
        width: 200,
        height: 200
    },
}));

const EventsCreateScreen = ({eventState, createEvent, clearDocRef, history}) => {
    const classes = useStyles();
    const [inputs, setInputs] = React.useState({
        title: '',
        description: '',
        newTag: '',
    });
    const [eventImg, setEventImg] = React.useState(null);
    const [uploadOpen, setUploadOpen] = React.useState(false);

    const [loading, setLoading] = React.useState(false)

    const [lists, setList] = React.useState([
        // Defaults
        {key: uniqid(), label: 'Signups'},
        {key: uniqid(), label: 'Waitlist'}
    ]);

    const [tags, setTags] = React.useState([
        // Defaults
        {key: uniqid(), label: 'Attended'},
        {key: uniqid(), label: 'VIP'}
    ]);

    const docRef = useSelector(({events}) => events.docRef);

    useEffect(() => {
        if (docRef !== null) {
            history.push(`/events/${docRef.id}`);
            clearDocRef()
        }
    });

    const handleChange = prop => e => {
        const value = e.target.value;
        setInputs({ ...inputs, [prop]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        console.log(eventImg)
        createEvent({
                title: inputs.title,
                description: inputs.description,
            },
            lists,
            tags.map((tag) => {
                return tag.label
            }),
            eventImg
        );
    };

    const handleTagAdd = (e) => {
        e.preventDefault();
        if (inputs.newTag !== '') {
            setTags([...tags, {key: uniqid(), label: inputs.newTag}]);
            setInputs({...inputs, newTag: ''})
        }
    };

    const handleUploadDialog = (openState) => {
        setUploadOpen(openState);
    };

    const handleFileChange = uploads => {
        handleUploadDialog(false);
        setEventImg(uploads[0]);
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
                        aria-label="add"
                        className={classes.menuButton}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                }
                title="Create Event"
                end={
                    loading ?
                        <CircularProgress color="inherit" size={30}/>
                        :
                        <IconButton
                            edge="end"
                            onClick={handleSubmit}
                            color="inherit"
                            aria-label="add"
                        >
                            <CheckIcon />
                        </IconButton>
                }
            />
            {/*<LinearProgress />*/}
            <Container maxWidth="md">
                <h2>Event Image</h2>
                <div>
                    <img className={classes.image} src={eventImg ? URL.createObjectURL(eventImg) : defaultImg} alt=""/>
                </div>

                <Button className={classes.button} variant="contained" disableElevation color="primary" onClick={() => handleUploadDialog(true)}>Upload Image</Button>
                <Button className={classes.button} variant="contained" disableElevation onClick={() => setEventImg(null)}>Remove Image</Button>

                <DropzoneDialog
                    open={uploadOpen}
                    onSave={handleFileChange}
                    filesLimit={1}
                    acceptedFiles={['image/jpeg', 'image/png']}
                    dropzoneText={"Upload Event Image"}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={() => handleUploadDialog(false)}
                    submitButtonText={'Upload'}
                />

                <h2>Event Details</h2>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className={classes.inputs}>
                        <TextField
                            id="title-input"
                            label="Title"
                            variant="filled"
                            onChange={handleChange('title')}
                        />
                        <TextField
                            id="description-input"
                            label="Description"
                            variant="filled"
                            onChange={handleChange('description')}
                        />
                    </div>
                </form>
                <h2>Lists</h2>
                <ListsList list={lists} setList={setList}/>
                <h2>Tags</h2>
                <ListItem>
                    <form noValidate autoComplete="off" onSubmit={handleTagAdd}>
                        <TextField
                            id="tag-input"
                            label="Add new tag"
                            value={inputs.newTag}
                            onChange={handleChange('newTag')}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="Add" type="submit">
                                <AddIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </form>
                </ListItem>
                <TagBoard tags={tags} setTags={setTags} />
            </Container>
        </div>
    )
};

const mapState = state => {return {eventState: state.events}};
const mapDispatch = {createEvent: createEvent, clearDocRef: clearDocRef};

export default connect(mapState, mapDispatch)(EventsCreateScreen)