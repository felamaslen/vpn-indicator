/* eslint-disable no-unused-vars */
import { Map as map } from 'immutable';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    vpnStatusRequested,
    vpnStatusToggled
} from '../actions/app.actions';

import Header from '../components/Header';
import CurrentStatus from '../components/CurrentStatus';

import getConfig from '../../config';
const config = getConfig().webui;

class App extends Component {
    checkState() {
        vpnStatusRequested()(this.props.dispatch);
    }
    toggleState() {
        vpnStatusToggled()(this.props.dispatch);
    }
    componentDidMount() {
        this.checkState();
    }
    componentWillUpdate(nextProps) {
        // periodically check the VPN status
        if (this.props.loading && !nextProps.loading) {
            setTimeout(() => {
                this.checkState();
            }, this.props.checkTimeout);
        }
    }
    render() {
        return (
            <div className="container">
                <Header title={config.title} />
                <div className="main">
                    <CurrentStatus
                        statusText={this.props.vpnStatusText}
                        loading={this.props.loading}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary toggle-btn"
                    onClick={() => this.toggleState()}>Toggle</button>
            </div>
        );
    }
}

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    checkTimeout: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    vpnStatusText: PropTypes.instanceOf(map).isRequired
};

function mapStateToProps(reduction, ownProps) {
    return {
        loading: reduction.getIn(['appState', 'loading']),
        checkTimeout: reduction.getIn(['appState', 'checkTimeout']),
        vpnStatusText: reduction.getIn(['appState', 'vpnStatusText'])
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

