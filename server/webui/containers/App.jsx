/* eslint-disable no-unused-vars */
import { Map as map } from 'immutable';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    vpnStatusRequested,
    vpnStatusToggled,
    languageSelected
} from '../actions/app.actions';

import Header from '../components/Header';
import CurrentStatus from '../components/CurrentStatus';
import LanguageSelector from '../components/LanguageSelector';

import getConfig from '../../config';
const config = getConfig().webui;

export class App extends Component {
    checkState() {
        vpnStatusRequested()(this.props.dispatch);
    }
    toggleState() {
        vpnStatusToggled()(this.props.dispatch);
    }
    selectLang(value) {
        languageSelected(value)(this.props.dispatch);
    }
    componentDidMount() {
        this.checkState();
    }
    componentWillUpdate(nextProps) {
        // periodically check the VPN status
        if (this.props.loading && !nextProps.loading) {
            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = setTimeout(() => {
                this.checkState();
            }, this.props.checkTimeout);
        }
    }
    render() {
        const langInputOnChange = value => this.selectLang(value);

        return (
            <div className="container">
                <Header
                    title={this.props.textTitle}
                    hostnameText={this.props.textHostname}
                    hostname={config.hostname} />
                <div className="main">
                    <CurrentStatus
                        status={this.props.vpnStatus}
                        loading={this.props.loading}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-primary toggle-btn"
                        onClick={() => this.toggleState()}>
                        {this.props.textToggleButton}
                    </button>
                </div>
                <LanguageSelector
                    value={this.props.langCode}
                    onChange={langInputOnChange}/>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    langCode: PropTypes.string.isRequired,
    checkTimeout: PropTypes.number.isRequired,
    vpnStatus: PropTypes.instanceOf(map).isRequired,
    textTitle: PropTypes.string.isRequired,
    textHostname: PropTypes.string.isRequired,
    textToggleButton: PropTypes.string.isRequired
};

function mapStateToProps(reduction, ownProps) {
    const appState = reduction.get('appState');

    const checkTimeout = Math.min(
        appState.get('maxTimeout'),
        appState.get('checkTimeout') * Math.pow(2, appState.get('numBadChecks'))
    );

    return {
        loading: appState.get('loading'),
        langCode: appState.getIn(['lang', 'code']),
        checkTimeout,
        vpnStatus: appState.get('vpnStatus'),
        textTitle: appState.getIn(['text', 'title']),
        textHostname: appState.getIn(['text', 'hostname']),
        textToggleButton: appState.getIn(['text', 'toggleButton'])
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

