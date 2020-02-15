
export const createUser = (credentials, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        /*const firestore = getFirestore();

        firestore.collection('test')
            .add({name: 'test'})
            .then(() => {
                dispatch({ type: 'TEST_SUCCESS' });
            }).catch((err) => {
                dispatch({ type: 'TEST_ERROR', err });
            });*/

        firebase.createUser(credentials, profile)
/*        firebase.createUser(
            { email, password },
            { username, email }
        )*/
            .then(() => {
                dispatch({ type: 'CREATE_USER_SUCCESS' });
            }).catch((err) => {
                dispatch({ type: 'CREATE_USER_ERROR', err });
            });
    }
}