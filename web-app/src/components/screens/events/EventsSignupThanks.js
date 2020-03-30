import React from "react";
import {Container} from "@material-ui/core";
import {connect, useSelector} from "react-redux";
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";

const EventsSignupThanks = ({eventID}) => {

    useFirestoreConnect(() => [
        { collection: 'events', doc: eventID }
    ])

    let event = useSelector(({ firestore: { data } }) => data.events && data.events[eventID])

    if (!isLoaded(event)) {
        return null
    }

    return (
        <Container>
            <h2>Signup confirmed for</h2>
            <h1>{event.title}</h1>
        </Container>
    )
}

const mapState = (state, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        eventID: id
    }
}


export default connect(mapState, undefined)(EventsSignupThanks)