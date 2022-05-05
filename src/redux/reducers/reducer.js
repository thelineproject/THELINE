
const initState = {
    isAuthenticated: false,
    isError: '',
    currentUser: {},
    booking: []
}

const reducer = (state = initState, action) => {
    // console.log(state, "THIS_IS_REDUCER")
    switch (action.type) {
        case 'isError':
            return {
                ...state,
                isError: action.payload,
            }
        case 'current_User':
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
            }
        case 'logout_User':
            return {
                ...state,
                isAuthenticated: false,
                isError: '',
                currentUser: {},
                booking: []
            }
        case 'set_bookings':
            return {
                ...state,
                booking: action.payload,
            }
        default:
            return state
    }
}
export default reducer