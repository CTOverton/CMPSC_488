
export const signUp = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firestore.collection('test')
            .add({name: 'test'})
            .then(() => {
                dispatch({ type: 'TEST_SUCCESS' });
            }).catch((err) => {
                dispatch({ type: 'TEST_ERROR', err });
            });
    }
}