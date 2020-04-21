const initState = {
    memberError: null,
    docRefs: null
};

export const memberReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_MEMBERS_SUCCESS':
            return {
                ...state,
                docRefs: action.docRefs,
                eventError: null
            };
        case 'ADD_MEMBERS_ERROR':
            return {
                ...state,
                docRefs: null,
                eventError: action.err.message
            };
        case 'UPDATE_MEMBERS_SUCCESS':
            return {
                ...state,
                docRefs: action.docRefs,
                eventError: null
            };
        case 'UPDATE_MEMBERS_ERROR':
            return {
                ...state,
                docRefs: null,
                eventError: action.err.message
            };
        case 'DELETE_MEMBERS_SUCCESS':
            return {
                ...state,
                docRefs: action.docRefs,
                eventError: null
            };
        case 'DELETE_MEMBERS_ERROR':
            return {
                ...state,
                docRefs: null,
                eventError: action.err.message
            };
        default:
            return state
    }
};