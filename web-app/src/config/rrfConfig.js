const rrfConfig = {
    userProfile: 'users',
    profileParamsToPopulate: [
        { child: 'role', root: 'roles' }, // populates user's role with matching role object from roles
    ],
    useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
    enableClaims: true, // Get custom claims along with the profile
    enableLogging: false
}

export default rrfConfig