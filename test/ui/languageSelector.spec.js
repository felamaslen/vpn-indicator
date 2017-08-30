import { expect } from 'chai';

import { Map as map } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';
import LanguageSelector from '../../server/webui/components/LanguageSelector';

describe('<LanguageSelector/>', () => {
    const wrapper = shallow(<LanguageSelector
        value="en_GB"
        onChange={() => null}
    />);

    it('should render a language selector', () => {
        const formDiv = wrapper.find('div.form-group');
        expect(formDiv).to.have.lengthOf(1);

        const select = formDiv.find('select.form-control');
        expect(select).to.have.lengthOf(1);

        const options = select.children();
        expect(options).to.have.lengthOf(3);
    });
});

