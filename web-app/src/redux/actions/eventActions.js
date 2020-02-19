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

