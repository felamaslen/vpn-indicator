export default type => {
    return () => {
        return dispatch => dispatch({ type });
    };
}

