export const saveUserData = (userData) => {
    return {
        type: 'SAVE',
        data: userData,
    }
}

export const setOnPlay = () => {
    return {
        type: 'IS_PLAYING'
    }
}

export const setOnPause = () => {
    return {
        type: 'NOT_PLAYING'
    }
}

export const setSongState = (playing) => async (dispatch) => {
    if(playing) dispatch(setOnPlay())
    else dispatch(setOnPause())
}

export const setUpUser = (userData) => async (dispatch) => {
    dispatch(saveUserData(userData));
}

