export default (initialState, actions) => {
    return (state = initialState, action) => {
        const theAction = actions.filter(thisAction => action.type === thisAction.type);
        if (theAction.length !== 1) {
            return state;
        }

        return Object.assign({}, state, theAction[0].state);
    };
}

