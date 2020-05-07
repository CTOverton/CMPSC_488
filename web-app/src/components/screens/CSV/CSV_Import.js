import React, {useRef} from 'react'
import AppBarHeader from "../../nav/AppBarHeader";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Select from "@material-ui/core/Select";
import CSVFileImport from "./CSVFileImport";
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {connect, useSelector} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import {addMembers} from "../../../redux/actions/memberActions";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(0.5),
        width: 'fit-content',
        color: theme.palette.text.secondary,
        '& > *': {
            margin: theme.spacing(0),
        },
        '& hr': {
            margin: theme.spacing(1, 0.5),
        },
        'h2': {
            textAlign: 'left'
        }
    },
    foo: {
        display: 'flex',
        textAlign: 'center',
        width: 'fit-content',
        overflowX: 'scroll',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const CSV_Import = ({match, history, addMembers}) => {
    const classes = useStyles();
    const {eventID, listID} = match.params;
    const [list, setList] = React.useState(listID);
    const [header, setHeader] = React.useState(true);
    const [attendees, changeAttendees] = React.useState(null);

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
        {collection: 'events', doc: eventID, subcollections: [{collection: 'lists'}], storeAs: "lists"},
    ]);

    const lists = useSelector(({firestore: {ordered}}) => ordered.lists);

    if (!isLoaded(lists)) {
        return null
    }

    const handleChange = (event) => {
        setList(event.target.value)
    }

    const handleClick = (e) => {
        setHeader(e.target.checked);
    }

    const handleCSVLoad = (data) => {
        addMembers(
            eventID,
            listID,
            data.map(row => {
                if (row.meta.fields) {
                    const {email, displayname, phone, tags} = row.data;
                    return {
                        email: email,
                        displayName: displayname,
                        phone: phone,
                        tags: tags.split(",")
                    }
                }
            })
        )
    }

    const parseOptions = {
        header: header,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
            header
                .toLowerCase()
                .replace(/\W/g, '_')
    }

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
                        aria-label="back"
                    >
                        <ArrowBackIosIcon/>
                    </IconButton>
                }
                title={"Import Attendees"}
            />

            <h2>Select List to import to</h2>
            <FormControl className={classes.formControl}>
                <Select
                    id="lists"
                    value={list}
                    onChange={handleChange}
                >
                    {lists.map(list =>
                        <MenuItem key={list.id} value={list.id}> {list.name} </MenuItem>
                    )}
                </Select>
            </FormControl>

            <h2>Other settings</h2>

            <FormControlLabel
                control={
                    <Checkbox
                        defaultChecked
                        color="primary"
                        value={header}
                        onChange={handleClick}
                        inputProps={{'aria-label': 'secondary checkbox'}}/>
                }
                label={"Header Row"}
            />

            <CSVFileImport onFileLoad={handleCSVLoad} parseOptions={parseOptions}/>

{/*            <div id={"data_labeling"}>
                {attendees && attendees.map(attendee => {
                    console.log(attendee);
                    //TODO: FIX DIS
                })}
            </div>*/}
        </div>
    );
};

const mapDispatch = {addMembers: addMembers}

export default connect(undefined, mapDispatch)(CSV_Import)