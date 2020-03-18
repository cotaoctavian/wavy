export const saveUserData = (userData) => {
    return {
        type: 'SAVE',
        data: userData,
    }
}

export const setUpUser = (userData) => async (dispatch) => {
    dispatch(saveUserData(userData));
}

