/**
 * render a language selector
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { languages } from '../lang';

class LanguageSelector extends Component {
    render() {
        const langInputRef = input => {
            this.langSelect = input;
        };

        const langInputOnChange = () => {
            return this.props.onChange(this.langSelect.value);
        };

        const langOptions = languages.map(language => {
            return (
                <option
                    value={language.get('code')}
                    key={language.get('code')}>
                    {language.get('name')}
                </option>
            );
        });

        return (
            <div className="form-group">
                <select className="form-control"
                    ref={langInputRef}
                    onChange={langInputOnChange}
                    defaultValue={this.props.value}>
                    {langOptions}
                </select>
            </div>
        );
    }
}

LanguageSelector.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default LanguageSelector;


