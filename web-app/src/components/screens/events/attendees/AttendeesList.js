import React from "react";
import List from "@material-ui/core/List";
import AttendeesListItem from "./AttendeesListItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const AttendeesList = ({attendees}) => {
    const [search, setSearch] = React.useState(null)

    if (attendees === null) return <div>No Attendees</div>

    const handleSearch = e => {
        setSearch(e.target.value === '' ? null : e.target.value.toLowerCase())
    }

    return (
        <List component="nav">
            <h1>Attendees List</h1>
            <Link to={'/events/n8HFZTwo9lHtdgOPKZT8/attendee/add'} style={{ textDecoration: 'none' }}><Button variant="contained" disableElevation>Add New</Button></Link>

            <br/>
            <TextField
                id="search-input"
                label="Search"
                type="search"
                onChange={handleSearch}
            />


            {attendees.map((attendee) => {
                const index = attendee.email + attendee.firstName + attendee.lastName
                if (index.toLowerCase().includes(search) || search === null) {
                    return <AttendeesListItem attendee={attendee} key={attendee.id}/>
                }
            })}
        </List>
    )
}

export default AttendeesList