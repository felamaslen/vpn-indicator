/**
 * render a header bar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map as map } from 'immutable';
import classNames from 'classnames';

class CurrentStatus extends Component {
    render() {
        const classes = classNames({
            'current-status': true,
            [this.props.statusText.get('type')]: !this.props.loading,
            loading: this.props.loading
        });

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

