import React from "react";
import List from "@material-ui/core/List";
import AttendeesListItem from "./AttendeesListItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import CSVFileImport from "../../CSV/CSVFileImport";

const AttendeesList = ({attendees, eventID, filtered_by_tags}) => {
    const [search, setSearch] = React.useState(null)

    if (attendees === null) return <div>No Attendees</div>

    const handleSearch = e => {
        setSearch(e.target.value === '' ? null : e.target.value.toLowerCase())
    }

    return (
        <List component="nav">
            <h1>Attendees List</h1>
            <span>
                <Link to={'/events/'+eventID+'/attendee/add'} style={{ textDecoration: 'none' }}><Button variant="contained" disableElevation>Add New</Button></Link>
                <CSVFileImport eventID={eventID}/>
            </span>

            <br/>
            <TextField
                id="search-input"
                label="Search"
                type="search"
                onChange={handleSearch}
            />


            {attendees.map((attendee) => {
                const index = attendee.email + attendee.firstName + attendee.lastName
                console.log(attendee);
                console.log(filtered_by_tags)
                if ((index.toLowerCase().includes(search) || search === null) && (filtered_by_tags === undefined || filtered_by_tags === [] || filtered_by_tags === null|| filtered_by_tags.every(v => attendee.tags.includes(v)))) {
                    return <AttendeesListItem eventID={eventID} attendee={attendee} key={attendee.id}/>
                }
            })}
        </List>
    )
}

export default AttendeesList