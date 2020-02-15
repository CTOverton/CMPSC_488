const initState = {
    authError: null
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USER_SUCCESS':
            return {
                ...state
            }
        case 'CREATE_USER_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }
}