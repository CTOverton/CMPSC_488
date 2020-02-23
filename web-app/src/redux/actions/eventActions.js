export const createEvent = (event) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        // Todo: validate event input

        firestore.collection('events')
            .add(event)
            .then((docRef) => {
                dispatch({ type: 'CREATE_EVENT_SUCCESS', docRef })
            })
            .catch((err) => {
                dispatch({ type: 'CREATE_EVENT_ERROR', err })
            })
    }
}

export const updateEvent = (eventID, event) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        // Todo: validate event input

        firestore.collection('events')
            .doc(eventID)
            .update(event)
            .then(() => {
                dispatch({ type: 'UPDATE_EVENT_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'UPDATE_EVENT_ERROR', err })
            })
    }
}

export const deleteEvent = (eventID) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        firestore.collection('events')
            .doc(eventID)
            .delete()
            .then(() => {
                dispatch({ type: 'DELETE_EVENT_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'DELETE_EVENT_ERROR', err })
            })
    }
}


// SAM
function isApprovedAttendee(attendee) {
    if (typeof attendee.email != "string") return false;
    if (typeof attendee.firstName != "string") return false;
    if (typeof attendee.lastName != "string") return false;
    //Don't need a check for attendee.isUser ???
    return true;
}

export const createAttendees = (attendees,eventID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        const validAttendees = [];
        const invalidAttendees = [];

        for(const attendee in attendees) {
            if (isApprovedAttendee(attendee)) {
                validAttendees.push(attendee);
            }
            else{
                invalidAttendees.push(attendee);
            }
        }

        if(validAttendees.length > 0) {
            const batch = firestore.batch();

            for(const attendee in validAttendees){
                const attendDocRef = firestore.collection("events").doc(eventID).collection("attendees");
                batch.add(attendDocRef, attendee)
            }
            batch.commit()
                .then(() => {
                    dispatch({ type: 'ADD_ATTENDEES_SUCCESS' })
                }).catch((err) => {
                dispatch({ type: 'ADD_ATTENDEES_ERROR', err })
            })

        }
        if(invalidAttendees > 0){
            const batch = firestore.batch();

            for(const attendee in validAttendees){
                const attendDocRef = firestore.collection("events").doc(eventID).collection("failedImports");
                batch.add(attendDocRef, attendee)
            }
            batch.commit()
                .then(() => {
                    dispatch({ type: 'ADD_FAILED_IMPORTS_SUCCESS' })
                }).catch((err) => {
                dispatch({ type: 'ADD_FAILED_IMPORTS_ERROR', err })
            })
            //TODO: Notify Admin of Failed Imports
        }
    }
};