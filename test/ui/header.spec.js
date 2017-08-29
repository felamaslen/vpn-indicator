import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../server/webui/components/Header';

describe('<Header/>', () => {
    it('should have a title element', () => {
        const wrapper = shallow(<Header/>);
        const title = wrapper.find('h1');

        expect(title).to.have.lengthOf(1);
        expect(title.is('#title')).to.equal(true);
        expect(title.hasClass('title')).to.equal(true);
    });

    it('should have a title property', () => {
        const wrapper = shallow(<Header title="TestTitle" />);
        expect(wrapper.instance().props.title).to.equal('TestTitle');
    });
});

