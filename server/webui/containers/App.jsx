/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    vpnStatusRequested,
    vpnStatusReceived
} from '../actions/app.actions';

import CurrentStatus from '../components/CurrentStatus';

class App extends Component {
    render() {
        return (
            <div className="app-container">
                <CurrentStatus statusText={this.props.vpnStatusText}/>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    vpnStatusText: PropTypes.string.isRequired
};

function mapStateToProps(reduction, ownProps) {
    return {
        vpnStatusText: reduction.getIn(['appState', 'vpnStatusText'])
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

