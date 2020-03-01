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
    if (attendee.email != null && typeof attendee.email != "string") return false;
    if (attendee.firstName != null && typeof attendee.firstName != "string") return false;
    if (attendee.lastName != null && typeof attendee.lastName != "string") return false;
    //Don't need a check for attendee.isUser ???
    return true;
}

//assumption: Header Row
export const createAttendees = (attendees,eventID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // creates an array of JSON objects with field names from the header row
        //TODO: Validate Header Row Options
        const cleanedAttendees = [];
        for(let int = 1; int < attendees.length; int++){
            const partial = {};
            for(let int1 = 0; int1 < attendees[int].length; int1++){
                const value = attendees[0][int1].replace(' ', '');
                if(!value.toLowerCase().equals('tags')){
                    partial[value] = attendees[int][int1];
                }
                else{
                    const arr = attendees[int][int1].split(',');
                    partial['tags'] = arr;
                }
            }
            cleanedAttendees.push(partial);
        }
        console.log(cleanedAttendees);

        const firestore = getFirestore();

        const validAttendees = [];
        const invalidAttendees = [];

        for(let int = 0; int < cleanedAttendees.length; int++) {
            if (isApprovedAttendee(cleanedAttendees[int])) {
                validAttendees.push(cleanedAttendees[int]);
            }
            else{
                invalidAttendees.push(cleanedAttendees[int]);
            }
        }

        if(validAttendees.length > 0) {
            const batch = firestore.batch();
            for(let int = 0; int < validAttendees.length; int++){
                const attendDocRef = firestore.collection("events").doc(eventID).collection("attendees").doc(validAttendees[int].email);
                batch.set(attendDocRef, validAttendees[int])
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

            for(let int = 0; int < invalidAttendees.length; int++){
                const attendDocRef = firestore.collection("events").doc(eventID).collection("error_attendees").doc(invalidAttendees[int].email);
                batch.set(attendDocRef, invalidAttendees[int])
            }
            batch.commit()
                .then(() => {
                    dispatch({ type: 'ADD_FAILED_IMPORTS_SUCCESS' })
                }).catch((err) => {
                dispatch({ type: 'ADD_FAILED_IMPORTS_ERROR', err })
            })
            //TODO: Notify Admin of Failed Imports
        }

        //TODO: Notify User of successful Import!
    }
};