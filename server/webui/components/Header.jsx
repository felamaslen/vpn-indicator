/**
 * render a header bar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    render() {
        return (
            <header>
                <h1 className="title" id="title">{this.props.title}</h1>
                <h2 id="hostname">
                    <span className="label">{this.props.hostnameText}</span>
                    <span className="value">{this.props.hostname}</span>
                </h2>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    hostnameText: PropTypes.string.isRequired,
    hostname: PropTypes.string.isRequired
};

export default Header;

