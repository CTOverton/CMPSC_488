function isApprovedAttendee(attendee) {
    return false;
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
}


/*export const createUser = (credentials, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();

        const {username} = profile;
        // if ()
        if (username == null) {dispatch({ type: 'CREATE_USER_ERROR', err: {message: "Username is required"} });}
        else {
            firebase.createUser(credentials, profile)
                .then(() => {
                    dispatch({ type: 'CREATE_USER_SUCCESS' })
                }).catch((err) => {
                dispatch({ type: 'CREATE_USER_ERROR', err })
            })
        }
    }
}*/