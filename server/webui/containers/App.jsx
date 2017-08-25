/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    vpnStatusRequested,
    vpnStatusToggled
} from '../actions/app.actions';

import CurrentStatus from '../components/CurrentStatus';

class App extends Component {
    checkState() {
        vpnStatusRequested()(this.props.dispatch);
    }
    toggleState() {
        vpnStatusToggled()(this.props.dispatch);
    }
    render() {
        return (
            <div className="app-container">
                <div>
                    <CurrentStatus
                        statusText={this.props.vpnStatusText}
                        loading={this.props.loading}
                    />
                </div>
                <button onClick={() => this.checkState()}>Check</button>
                <button onClick={() => this.toggleState()}>Toggle</button>
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
        loading: reduction.getIn(['appState', 'loading']),
        vpnStatusText: reduction.getIn(['appState', 'vpnStatusText'])
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

