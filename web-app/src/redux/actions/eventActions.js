import {isEmpty, isLoaded} from "react-redux-firebase";
import React from "react";


export const createEvent = (event, lists, tags) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const state = getState();
        const {auth} = state.firebase;

        if (isLoaded(auth) && isEmpty(auth)) {
            return dispatch({type: 'CREATE_EVENT_ERROR', err: {message: 'User Not Logged In'}})
        }

        const signature = {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: auth.uid
        };

        // Todo: validate event input

        let promises = [
            firestore
            .collection('events')
            .add({...event, ...signature})
        ];

        lists.map((list, index) => {
            promises.push(
                firestore
                    .collection('tags')
                    .add({name: list.label, type: 'list', ...signature})
            )

        });

        tags.map((tag, index) => {
            promises.push(
                firestore
                    .collection('tags')
                    .add({name: tag.label, type: 'default', ...signature})
            )
        });

        Promise.all(promises)
            .then(values => {
                const eventRef = values[0].id;
                let tagValues = {};
                values.slice(1).map(tag => {
                    tagValues[tag.id] = true
                });

                Promise.all([
                    firestore
                        .collection('eventTags')
                        .doc(eventRef)
                        .set({tags: tagValues}),
                    firestore
                        .collection('eventMembers')
                        .doc(eventRef)
                        .set({members: {}}),
                    firestore
                        .collection('eventSettings')
                        .doc(eventRef)
                        .set({settings: {}}),
                    ])
                    .then(() => {
                        dispatch({type: 'CREATE_EVENT_SUCCESS', eventRef})
                    })
            })
            .catch((err) => {
                dispatch({type: 'CREATE_EVENT_ERROR', err})
            });
    }
};

export const updateEvent = (eventID, event) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        // Todo: validate event input

        firestore.collection('events')
            .doc(eventID)
            .update(event)
            .then(() => {
                dispatch({type: 'UPDATE_EVENT_SUCCESS'})
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_EVENT_ERROR', err})
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
                dispatch({type: 'DELETE_EVENT_SUCCESS'})
            })
            .catch((err) => {
                dispatch({type: 'DELETE_EVENT_ERROR', err})
            })
    }
}

export const signupForEvent = (eventID, attendee, type) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        const firebase = getFirebase()

        attendee = {
            ...attendee,
            signupAt: firebase.firestore.FieldValue.serverTimestamp(),
        }

        firestore.collection('events')
            .doc(eventID)
            .collection(type)
            .add(attendee)
            .then(() => {
                dispatch({type: 'SIGNUP_SUCCESS'})
            })
            .catch((err) => {
                dispatch({type: 'SIGNUP_ERROR', err})
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
export const createAttendees = (attendees, eventID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // creates an array of JSON objects with field names from the header row
        //TODO: Validate Header Row Options
        const cleanedAttendees = [];
        for (let int = 1; int < attendees.length; int++) {
            const partial = {};
            if (attendees[int][0] === "") {
                break;
                //Breaks if the next line is blank.
                //TODO: Make more fullproof
            }
            for (let int1 = 0; int1 < attendees[int].length; int1++) {
                const value = attendees[0][int1].replace(' ', '');
                if (value.toLowerCase() !== "tags") {
                    partial[value] = attendees[int][int1];
                } else {
                    const arr = attendees[int][int1].split(',');
                    partial['tags'] = arr;
                }
            }
            cleanedAttendees.push(partial);
        }

        const firestore = getFirestore();

        const validAttendees = [];
        const invalidAttendees = [];

        for (let int = 0; int < cleanedAttendees.length; int++) {
            if (isApprovedAttendee(cleanedAttendees[int])) {
                validAttendees.push(cleanedAttendees[int]);
            } else {
                invalidAttendees.push(cleanedAttendees[int]);
            }
        }

        if (validAttendees.length > 0) {
            const batch = firestore.batch();
            for (let int = 0; int < validAttendees.length; int++) {
                console.log(eventID);
                console.log(validAttendees[int].email);
                const attendDocRef = firestore.collection("events").doc(eventID).collection("attendees").doc(validAttendees[int].email);
                batch.set(attendDocRef, validAttendees[int])
            }
            batch.commit()
                .then(() => {
                    dispatch({type: 'ADD_ATTENDEES_SUCCESS'})
                }).catch((err) => {
                dispatch({type: 'ADD_ATTENDEES_ERROR', err})
            })
        }
        if (invalidAttendees > 0) {
            const batch = firestore.batch();

            for (let int = 0; int < invalidAttendees.length; int++) {
                const attendDocRef = firestore.collection("events").doc(eventID).collection("error_attendees").doc(invalidAttendees[int].email);
                batch.set(attendDocRef, invalidAttendees[int])
            }
            batch.commit()
                .then(() => {
                    dispatch({type: 'ADD_FAILED_IMPORTS_SUCCESS'})
                }).catch((err) => {
                dispatch({type: 'ADD_FAILED_IMPORTS_ERROR', err})
            })
            //TODO: Notify Admin of Failed Imports
        }
        //TODO: Notify User of successful Import!
    }
};

export const removeTags = (eventID, tag) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        const batch = firestore.batch();
        firestore.collection('events')
            .doc(eventID)
            .collection('attendees')
            .where("tags", "array-contains", tag)
            .get()
            .then(function (data) {
                data.forEach(function (doc) {
                    const temp = doc.data();
                    let new_tags = [];
                    for (let count = 0; count < temp.tags.length; count++) {
                        if (temp.tags[count] !== tag) {
                            new_tags.push(temp.tags[count]);
                        }
                    }
                    temp.tags = new_tags;
                    const attendDocRef = firestore.collection("events").doc(eventID).collection("attendees").doc(temp.email);
                    batch.set(attendDocRef, temp);
                })
                batch.commit().catch(r => dispatch({type: 'DELETE_TAGS_ERROR_1', r}));
            })
        firestore
            .collection('events')
            .doc(eventID)
            .update({
                    tags: firestore.FieldValue.arrayRemove(tag)
                }
            )
            .then(() => {
                dispatch({type: 'DELETE_TAGS_SUCCESS'})
            })
            .catch((err) => {
                dispatch('DELETE_TAGS_ERROR_2', err)
            })
    }
};