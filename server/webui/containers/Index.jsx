/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';

// import actions
import actionCreator from '../actions/Index'

import IndexComponent from '../components/Index';

function mapStateToProps(state, ownProps) {
    return {
        message: state.indexPage.message
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClick: () => {
            dispatch(actionCreator.helloWorld());
        }
    };
}

const IndexContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexComponent);

IndexContainer.initState = (store, req, res) => {
    return (dispatch, getState) => Promise.resolve();
};

export default IndexContainer;

