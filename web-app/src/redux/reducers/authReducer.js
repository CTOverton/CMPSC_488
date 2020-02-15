const initState = {
    authError: null
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'TEST_SUCCESS':
            console.log("test success")
            return {
                ...state
            }
        case 'TEST_ERROR':
            console.log("test error")
            console.log(action.err.message)
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }
}