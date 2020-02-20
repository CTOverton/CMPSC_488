const initState = {
    eventError: null
}

export const eventReducer = (state = initState, action) => {
    switch (action.type) {
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
        default:
            return state
    }
}