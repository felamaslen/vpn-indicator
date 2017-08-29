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
                <h2 id="hostname">{this.props.hostname}</h2>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string,
    hostname: PropTypes.string
};

export default Header;

