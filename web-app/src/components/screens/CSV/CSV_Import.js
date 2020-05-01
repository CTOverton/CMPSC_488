import React from 'react'
import AppBarHeader from "../../nav/AppBarHeader";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import CSVFileImport from "./CSVFileImport";
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ToolTip from "@material-ui/core/ToolTip";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";
import CardContent from "@material-ui/core/CardContent";

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
    },
    foo: {
        display: 'flex',
        textAlign: 'center',
        width: 'fit-content',
        overflowX: 'scroll',
    }
}));

const CSV_Import = ({match, history}) => {
    const classes = useStyles();
    const {eventID, listID} = match.params;
    const [list, setList] = React.useState(listID);
    const [checkbox_value, changeBox] = React.useState(false);
    const [attendees, changeAttendees] = React.useState(null);

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
        {collection: 'events', doc: eventID, subcollections: [{collection: 'lists'}], storeAs: "lists"},
    ]);

    const lists = useSelector(({firestore: {ordered}}) => ordered.lists);

    if (!isLoaded(lists)) {
        return "Loading Lists"
    }

    const handleChange = (event) => {
        console.log(event);
        setList(event.target.value)
    }

    const handleClick = () => {
        changeBox(!checkbox_value);
        console.log(attendees);
    }

    return (
        <div>
            <AppBarHeader start={<IconButton
                edge="end"
                onClick={() => {
                    history.goBack()
                }}
                color="inherit"
                aria-label="back"
            >
                <ArrowBackIosIcon/>
            </IconButton>
            } title={"Import Attendees"}/>

            <span>
                <FormControlLabel control={
                    <Select id="lists" value={list} onChange={handleChange}>
                        {lists.map(item => {
                            return <MenuItem value={item.id}> {item.name} </MenuItem>
                        })}
                    </Select>}
                                  label={""}/>
                <div/>
                <FormControlLabel control={
                    <Checkbox
                        color="primary"
                        value = {checkbox_value}
                        onChange={handleClick}
                        inputProps={{'aria-label': 'secondary checkbox'}}/>
                } label={"Header Row"}/>
            </span>
            <CSVFileImport eventID={eventID} list={listID} changeAttendees={changeAttendees}/>
            <div id={"data_labeling"}>
                {attendees && attendees.map(attendee => {
                    console.log(attendee);
                    //TODO: FIX DIS
                })}
            </div>
        </div>
    );
};

export default CSV_Import