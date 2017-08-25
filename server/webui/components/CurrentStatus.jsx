/**
 * render a header bar
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';

class CurrentStatus extends Component {
    render() {
        return (
            <span className="current-status-wrapper">
                {this.props.statusText}
            </span>
        );
    }
}

CurrentStatus.propTypes = {
    statusText: propTypes.string
};

export default CurrentStatus;

