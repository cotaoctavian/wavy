export const saveUserData = (userData) => {
    return {
        type: 'SAVE',
        data: userData
    }
}

export const login = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const setUpUser = (userData) => dispatch => {
    return Promise.all([dispatch(saveUserData(userData))])
}