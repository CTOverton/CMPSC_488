export const createUser = (credentials, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()

        const {username} = profile
        // if (TODO: username is taken)
        if (username == null) {dispatch({ type: 'CREATE_USER_ERROR', err: {message: "Username is required"} })}
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
}

export const loginUser = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()

        firebase.login(credentials)
            .then(() => {
                dispatch({ type: 'LOGOUT_USER_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'LOGOUT_USER_ERROR', err })
            })
    }
}

export const logoutUser = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()

        firebase.logout()
            .then(() => {
                dispatch({ type: 'LOGOUT_USER_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'LOGOUT_USER_ERROR', err })
            })

    }
}

export const changeUsername = (credentials, profile, newUsername) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        const newProfile = {
                email: profile.email,
                username: newUsername,
                firstName: profile.firstName,
                lastName: profile.lastName
            }

        firebase.update(credentials, newProfile)
            .then(() => {
                dispatch({ type: 'USERNAME_UPDATE_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'USERNAME_UPDATE_ERROR', err })
            })
    }
}