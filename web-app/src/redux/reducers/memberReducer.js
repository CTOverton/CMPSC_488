const initState = {
    memberError: null,
    docRefs: null
};

export const memberReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_MEMBERS_SUCCESS':
            return {
                ...state,
                memberError: null
            };
        case 'ADD_MEMBERS_ERROR':
            return {
                ...state,
                memberError: action.err.message
            };
        case 'UPDATE_MEMBERS_SUCCESS':
            return {
                ...state,
                memberError: null
            };
        case 'UPDATE_MEMBERS_ERROR':
            return {
                ...state,
                memberError: action.err.message
            };
        case 'DELETE_MEMBERS_SUCCESS':
            return {
                ...state,
                memberError: null
            };
        case 'DELETE_MEMBERS_ERROR':
            return {
                ...state,
                memberError: action.err.message
            };
        case 'TAG_MEMBERS_SUCCESS':
            return {
                ...state,
                memberError: null
            };
        case 'TAG_MEMBER_ERROR':
            return {
                ...state,
                memberError: action.err.message
            };
        case 'UNTAG_MEMBERS_SUCCESS':
            return {
                ...state,
                memberError: null
            };
        case 'UNTAG_MEMBER_ERROR':
            return {
                ...state,
                memberError: action.err.message
            };
        default:
            return state
    }
};