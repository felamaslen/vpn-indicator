/**
 * render a header bar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map as map } from 'immutable';

import LoadingSpinner from './LoadingSpinner';

class CurrentStatus extends Component {
    render() {
        if (this.props.loading) {
            return <LoadingSpinner />;
        }

        const classes = `current-status ${this.props.statusText.get('type')}`;
        return (
            <span className={classes}>
                {this.props.statusText.get('text')}
            </span>
        );
    }
}

CurrentStatus.propTypes = {
    loading: PropTypes.bool,
    statusText: PropTypes.instanceOf(map)
};

export default CurrentStatus;

