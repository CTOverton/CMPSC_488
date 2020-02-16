export const createUser = (credentials, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();

        const {username} = profile;
        // if (TODO: username is taken)
        if (username == null) {dispatch({ type: 'CREATE_USER_ERROR', err: {message: "Username is required"} });}
        else {
            firebase.createUser(credentials, profile)
                .then(() => {
                    dispatch({ type: 'CREATE_USER_SUCCESS' });
                }).catch((err) => {
                dispatch({ type: 'CREATE_USER_ERROR', err });
            });
        }
    }
}

export const loginUser = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();


    }
}

export const logoutUser = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();


    }
}


/*
export const createUser = (credentials, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        /!*const firestore = getFirestore();

        firestore.collection('test')
            .add({name: 'test'})
            .then(() => {
                dispatch({ type: 'TEST_SUCCESS' });
            }).catch((err) => {
                dispatch({ type: 'TEST_ERROR', err });
            });*!/

        firebase.createUser(credentials, profile)
            .then(() => {
                dispatch({ type: 'CREATE_USER_SUCCESS' });
            }).catch((err) => {
            dispatch({ type: 'CREATE_USER_ERROR', err });
        });
    }
}*/
