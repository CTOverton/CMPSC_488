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
        default:
            return state
    }
}