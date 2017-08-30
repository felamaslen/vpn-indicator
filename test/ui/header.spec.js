import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../server/webui/components/Header';

describe('<Header/>', () => {
    it('should have a title element', () => {
        const wrapper = shallow(<Header hostname="TestHostname" />);
        const title = wrapper.find('h1');

        expect(title).to.have.lengthOf(1);
        expect(title.is('#title')).to.equal(true);
        expect(title.hasClass('title')).to.equal(true);
    });

    it('should have a title property', () => {
        const wrapper = shallow(<Header title="TestTitle" hostname="TestHostname" />);
        expect(wrapper.instance().props.title).to.equal('TestTitle');
    });

    it('should have a hostname element', () => {
        const wrapper = shallow(<Header hostname="TestHostname" />);
        const hostname = wrapper.find('h2');

        expect(hostname).to.have.lengthOf(1);
        expect(hostname.is('#hostname')).to.equal(true);
    });

    it('should have a hostname property', () => {
        const wrapper = shallow(<Header hostname="TestHostname" />);
        expect(wrapper.instance().props.hostname).to.equal('TestHostname');
    });
});

