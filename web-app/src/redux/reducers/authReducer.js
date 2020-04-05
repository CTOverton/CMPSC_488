const initState = {
    authError: null,
    pwAccepted: null
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USER_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'CREATE_USER_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGOUT_USER_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'LOGOUT_USER_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        case 'USERNAME_UPDATE_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'USERNAME_UPDATE_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        case 'REAUTHENTICATION_RESET':
            return {
                ...state,
                pwAccepted: null
            }
        case 'REAUTHENTICATION_ERROR':
            return {
                ...state,
                pwAccepted: action.err.message
            }
        default:
            return state
    }
}