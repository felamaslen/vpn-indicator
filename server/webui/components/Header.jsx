/**
 * render a header bar
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';

class Header extends Component {
    render() {
        return (
            <header>
                <h1 className="title" id="title">{this.props.title}</h1>
            </header>
        );
    }
}

Header.propTypes = {
    title: propTypes.string
};

export default Header;

