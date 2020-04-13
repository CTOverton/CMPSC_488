export const createUser = (credentials, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();

        // TODO: Check if username is already taken
        const {username} = profile;

        if (username == null) { dispatch({ type: 'CREATE_USER_ERROR', err: {message: "Username is required"} }) }
        else {
            firebase.createUser(credentials, profile)
                .then(() => {
                    dispatch({ type: 'CREATE_USER_SUCCESS' })
                })
                .catch((err) => {
                    dispatch({ type: 'CREATE_USER_ERROR', err })
                })
        }
    }
};

export const loginUser = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();

        firebase.login(credentials)
            .then(() => {
                dispatch({ type: 'LOGIN_USER_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'LOGIN_USER_ERROR', err })
            })
    }
};

export const logoutUser = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.logout()
            .then(() => {
                dispatch({ type: 'LOGOUT_USER_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'LOGOUT_USER_ERROR', err })
            })

    }
};

//    SEAN Actions
//    ----------------------------------------
export const changeUsername = (newUsername, credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const state = getState();
        const firebase = getFirebase();
        const firestore = getFirestore();

        const userID = state.firebase.auth.uid;

        firebase.login(credentials) //not working
            .then(() => {
                firestore.collection("users")
                    .doc(userID)
                    .update({
                        username: newUsername
                    })
                    .then(() => {
                        console.log("username success");
                        dispatch({ type: 'USERNAME_UPDATE_SUCCESS' });
                    })
                    .catch((err) => {
                        console.log("username failure");
                        dispatch({ type: 'USERNAME_UPDATE_ERROR', err });
                    })
            })
            .catch((err) => {
                console.log(credentials);
                dispatch({type: 'REAUTHENTICATION_ERROR', err})
            });
    }
};

//    ----------------------------------------