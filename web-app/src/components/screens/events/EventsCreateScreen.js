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
import Chip from "@material-ui/core/Chip";
import TagBoard from "./tags/TagBoard";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AddIcon from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import {isLoaded} from "react-redux-firebase";

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
    }
}));

const EventsCreateScreen = ({eventState, createEvent, clearDocRef, history}) => {
    const classes = useStyles();
    const [inputs, setInputs] = React.useState({
        title: '',
        description: '',
        newTag: '',
    });

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
        createEvent({
            title: inputs.title,
            description: inputs.description,
        }, lists, tags.map((tag) => {
            return tag.label
        }));
    };

    const handleTagAdd = (e) => {
        e.preventDefault();
        if (inputs.newTag !== '') {
            setTags([...tags, {key: uniqid(), label: inputs.newTag}]);
            setInputs({...inputs, newTag: ''})
        }
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