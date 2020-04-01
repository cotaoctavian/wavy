export const loadState = () => {
    try {
        const data = localStorage.getItem('token')
        if(data === null) {
            return undefined;
        }
        return data
    } catch(err) {
        return undefined;
    }
}
