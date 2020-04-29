import {isEmpty, isLoaded} from "react-redux-firebase";

export const updateProfileDetails = (details) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const state = getState();
        const {auth, profile} = state.firebase;

        if (isLoaded(auth) && isEmpty(auth)) {
            return dispatch({type: 'UPDATE_PROFILE_ERROR', err: {message: 'User Not Logged In'}})
        }

        console.log("yeet")

        firestore
            .collection('users')
            .doc(auth.uid)
            .update(details)
            .then(docRef => {
                dispatch({type: 'UPDATE_PROFILE_SUCCESS', docRef: docRef})
            })
            .catch(err => {
                dispatch({type: 'UPDATE_PROFILE_ERROR', err})
            });
    }
};

export const updateAvatar = (image) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const state = getState();
        const {auth} = state.firebase;

        if (isLoaded(auth) && isEmpty(auth)) {
            return dispatch({type: 'UPDATE_AVATAR_ERROR', err: {message: 'User Not Logged In'}})
        }

        firebase.uploadFile('userAvatarImages', image, undefined, {name: auth.uid})
            .then(snapshot => {
                dispatch({type: 'UPDATE_AVATAR_SUCCESS', snapshot})
            })
            .catch(err => {
                dispatch({type: 'UPDATE_AVATAR_ERROR', err})
            });

    }
};