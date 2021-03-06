import {isEmpty, isLoaded} from "react-redux-firebase";

export const addMembers = (eventID, listID, members) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const state = getState();
        const {auth, profile} = state.firebase;

        if (isLoaded(auth) && isEmpty(auth)) {
            return dispatch({type: 'ADD_MEMBER_ERROR', err: {message: 'User Not Logged In'}})
        }

        const signature = {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: auth.uid,
            author: {
                username: profile.username,
                displayName: profile.displayName
            }
        };

        // Todo: validate member input
        const promises = [];

        members.map(member => {
            return promises.push(
                firestore
                    .collection("users")
                    .where("email", "==", member.email)
                    .get()
                    .then(snapShot => {
                        snapShot.forEach(doc => {
                            const user = doc.data();

                            member = {
                                ...member,
                                uid: doc.id,
                                displayName: user.displayName,
                                username: user.username,
                            };
                        });

                        return promises.push(
                            firestore
                                .collection('events')
                                .doc(eventID)
                                .collection('lists')
                                .doc(listID)
                                .collection('members')
                                .add({...signature, ...member})
                        )
                    })
            );
        });

        Promise.all(promises)
            .then(values => {
                dispatch({type: 'ADD_MEMBERS_SUCCESS', docRefs: values})
            })
            .catch(err => {
                dispatch({type: 'ADD_MEMBERS_ERROR', err})
            });
    }
};

export const updateMembers = (eventID, listID, members) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const state = getState();
        const {auth} = state.firebase;

        if (isLoaded(auth) && isEmpty(auth)) {
            return dispatch({type: 'UPDATE_MEMBER_ERROR', err: {message: 'User Not Logged In'}})
        }

        const promises = [];

        members.map(member => {
            return promises.push(
                firestore
                    .collection('events')
                    .doc(eventID)
                    .collection('lists')
                    .doc(listID)
                    .collection('members')
                    .doc(member.id)
                    .update({...member, updatedAt: firebase.firestore.FieldValue.serverTimestamp()})
            )
        });

        Promise.all(promises)
            .then(values => {
                dispatch({type: 'UPDATE_MEMBERS_SUCCESS', values})
            })
            .catch(err => {
                dispatch({type: 'UPDATE_MEMBERS_ERROR', err})
            });
    }
};

export const deleteMembers = (eventID, listID, memberIDs) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const state = getState();
        const {auth} = state.firebase;

        if (isLoaded(auth) && isEmpty(auth)) {
            return dispatch({type: 'DELETE_MEMBER_ERROR', err: {message: 'User Not Logged In'}})
        }

        const promises = [];

        memberIDs.map(memberID => {
            return promises.push(
                firestore
                    .collection('events')
                    .doc(eventID)
                    .collection('lists')
                    .doc(listID)
                    .collection('members')
                    .doc(memberID)
                    .delete()
            )
        });

        Promise.all(promises)
            .then(values => {
                dispatch({type: 'DELETE_MEMBERS_SUCCESS', values})
            })
            .catch(err => {
                dispatch({type: 'DELETE_MEMBERS_ERROR', err})
            });
    }
};

export const tagMembers = (eventID, listID, memberIDs, tags) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const state = getState();
        const {auth} = state.firebase;

        if (isLoaded(auth) && isEmpty(auth)) {
            return dispatch({type: 'TAG_MEMBER_ERROR', err: {message: 'User Not Logged In'}})
        }

        console.log("Stop")
        const promises = [];

        memberIDs.map(id => {
            return promises.push(
                firestore
                    .collection('events')
                    .doc(eventID)
                    .collection('lists')
                    .doc(listID)
                    .collection('members')
                    .doc(id)
                    .update({
                        tags: firebase.firestore.FieldValue.arrayUnion(...tags),
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
            )
        });

        Promise.all(promises)
            .then(values => {
                dispatch({type: 'TAG_MEMBERS_SUCCESS', values})
            })
            .catch(err => {
                dispatch({type: 'TAG_MEMBERS_ERROR', err})
            });
    }
};

export const unTagMembers = (eventID, listID, memberIDs, tags) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const state = getState();
        const {auth} = state.firebase;

        if (isLoaded(auth) && isEmpty(auth)) {
            return dispatch({type: 'UNTAG_MEMBER_ERROR', err: {message: 'User Not Logged In'}})
        }

        console.log("Stop")
        const promises = [];

        memberIDs.map(id => {
            return promises.push(
                firestore
                    .collection('events')
                    .doc(eventID)
                    .collection('lists')
                    .doc(listID)
                    .collection('members')
                    .doc(id)
                    .update({
                        tags: firebase.firestore.FieldValue.arrayRemove(...tags),
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
            )
        });

        Promise.all(promises)
            .then(values => {
                dispatch({type: 'UNTAG_MEMBERS_SUCCESS', values})
            })
            .catch(err => {
                dispatch({type: 'UNTAG_MEMBER_ERROR', err})
            });
    }
};

export const signupMembers = (eventID, listID, members) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const state = getState();
        const {auth, profile} = state.firebase;

        if (isLoaded(auth) && !isEmpty(auth)) {
            firestore
                .collection("users")
                .doc(auth.uid)
                .update({
                    attending: firebase.firestore.FieldValue.arrayUnion(eventID),
                })
        }

        const signature = {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: isLoaded(auth) && !isEmpty(auth) ? auth.uid : "system", // Todo
            author: isLoaded(profile) && !isEmpty(profile) ? {
                username: profile.username,
                displayName: profile.displayName
            } : {username: "system", displayName: "system"}
        };

        // Todo: validate member input
        const promises = [];

        members.map(member => {
            return promises.push(
                firestore
                    .collection("users")
                    .where("email", "==", member.email)
                    .get()
                    .then(snapShot => {
                        snapShot.forEach(doc => {
                            const user = doc.data();

                            member = {
                                ...member,
                                uid: doc.id,
                                displayName: user.displayName,
                                username: user.username,
                            };
                        });

                        return promises.push(
                            firestore
                                .collection('events')
                                .doc(eventID)
                                .collection('lists')
                                .doc(listID)
                                .collection('members')
                                .add({...signature, ...member})
                        )
                    })
            );
        });

        Promise.all(promises)
            .then(values => {
                dispatch({type: 'ADD_MEMBERS_SUCCESS', docRefs: values})
            })
            .catch(err => {
                dispatch({type: 'ADD_MEMBERS_ERROR', err})
            });
    }
};