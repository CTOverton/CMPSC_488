const initState = {
    eventError: null,
    docRef: null
}

export const eventReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_EVENT_SUCCESS':
            return {
                ...state,
                docRef: action.docRef,
                eventError: null
            }
        case 'CREATE_EVENT_ERROR':
            return {
                ...state,
                eventError: action.err.message
            }
        case 'UPDATE_EVENT_SUCCESS':
            return {
                ...state,
                eventError: null
            }
        case 'UPDATE_EVENT_ERROR':
            return {
                ...state,
                eventError: action.err.message
            }
        case 'DELETE_EVENT_SUCCESS':
            return {
                ...state,
                eventError: null
            }
        case 'DELETE_EVENT_ERROR':
            return {
                ...state,
                eventError: action.err.message
            }
        case 'ADD_FAILED_IMPORTS_SUCCESS':
            return {
                ...state,
                eventError: null
            }
        case 'ADD_FAILED_IMPORTS_ERROR':
            return {
                ...state,
                eventError: action.err.message
            }
        case 'ADD_ATTENDEES_SUCCESS':
            return {
                ...state,
                eventError: null
            }
        case 'ADD_ATTENDEES_ERROR':
            return {
                ...state,
                eventError: action.err.message
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                signupError: null
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                signupError: action.err.message
            }
        case 'DELETE_TAGS_SUCCESS':
            return {
                ...state,
                eventError: null
            }
        case 'DELETE_TAGS_ERROR':
            return {
                ...state,
                eventError: action.err.message
            }
        default:
            return state
    }
}