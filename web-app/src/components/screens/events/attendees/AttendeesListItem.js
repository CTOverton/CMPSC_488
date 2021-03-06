import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const AttendeesListItem = ({attendee, eventID, tags}) => {
    const classes = useStyles();
    console.log(tags);
    return(
        <Link to={'/events/' + eventID + '/attendee/' + attendee.email} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
                <ListItemText primary={attendee.firstName + ' ' + attendee.lastName} />
                <div className={classes.chips}>
                    {tags && tags.map((tag) =>
                        <Chip key={tag} label={tag}/>
                    )}
                </div>
            </ListItem>
        </Link>
    )
}

export default AttendeesListItem