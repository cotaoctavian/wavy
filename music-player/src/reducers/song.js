const songReducer = (state = false, action) => {
    switch(action.type) {
        case 'IS_PLAYING':
            return {
                ...state, 
                playing: true
            }
        case 'NOT_PLAYING':
            return {
                ...state, 
                playing: false
            }
        default:
            return {
                ...state, 
                playing: false
            }
    }
}

export default songReducer