import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../server/webui/components/Header';

describe('<Header/>', () => {
    it('should have a title element', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('h1')).to.have.lengthOf(1);
    });
});

