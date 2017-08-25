/**
 * render a header bar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from './LoadingSpinner';

class CurrentStatus extends Component {
    render() {
        if (this.props.loading) {
            return <LoadingSpinner />;
        }

        return (
            <span className="current-status-wrapper">
                {this.props.statusText}
            </span>
        );
    }
}

CurrentStatus.propTypes = {
    loading: PropTypes.boolean,
    statusText: PropTypes.string
};

export default CurrentStatus;

