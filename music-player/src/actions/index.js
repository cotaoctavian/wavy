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

export const setUpUser = (userData) => async (dispatch) => {
    dispatch(login());
    dispatch(saveUserData(userData));
}

