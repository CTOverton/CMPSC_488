const initState = {
    userError: null,
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE_SUCCESS':
            return {
                ...state,
                userError: null
            };
        case 'UPDATE_PROFILE_ERROR':
            return {
                ...state,
                userError: action.err.message
            };
        case 'UPDATE_AVATAR_SUCCESS':
            return {
                ...state,
                userError: null
            };
        case 'UPDATE_AVATAR_ERROR':
            console.log(action.err)
            return {
                ...state,
                userError: action.err.message
            };
        default:
            return state
    }
};