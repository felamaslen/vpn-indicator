/**
 * render the base component for the index page
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class IndexComponent extends Component {
    render() {
        return (
            <div>
                <h2 className={classNames({ title: true })}>{this.props.message}</h2>
                <button onClick={this.props.onClick}>Click</button>
            </div>
        );
    }
}

// define component proptypes
IndexComponent.propTypes = {
    onClick: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
};

export default IndexComponent;

