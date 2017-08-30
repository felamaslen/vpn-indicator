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

import getConfig from '../../config';
const config = getConfig().webui;

import { languages } from '../lang';

export class App extends Component {
    checkState() {
        vpnStatusRequested()(this.props.dispatch);
    }
    toggleState() {
        vpnStatusToggled()(this.props.dispatch);
    }
    selectLang() {
        languageSelected(this.langSelect.value)(this.props.dispatch);
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
        const langOptions = languages.map(language => {
            return (
                <option
                    value={language.get('code')}
                    key={language.get('code')}
                >
                    {language.get('name')}
                </option>
            );
        });

        const langInputRef = input => {
            this.langSelect = input;
        };

        const langInputOnChange = () => this.selectLang();

        return (
            <div className="container">
                <Header title={config.title} hostname={config.hostname} />
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
                <div className="form-group">
                    <select className="form-control"
                        ref={langInputRef}
                        onChange={langInputOnChange}
                        defaultValue={this.props.langCode}>
                        {langOptions}
                    </select>
                </div>
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
        textToggleButton: appState.getIn(['text', 'toggleButton'])
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

