import { expect } from 'chai';

import { Map as map } from 'immutable';
import React from 'react';
import { shallow, mount } from 'enzyme';
import CurrentStatus from '../../server/webui/components/CurrentStatus';

describe('<CurrentStatus/>', () => {
    const testStatus = map({
        type: 'some_machine_value',
        text: 'Human readable status'
    });

    it('should have a status element', () => {
        const wrapper = shallow(<CurrentStatus statusText={testStatus}/>);
        expect(wrapper.find('span')).to.have.lengthOf(1);
    });

    it('should render a status property', () => {
        const wrapper = shallow(<CurrentStatus loading={false} statusText={testStatus} />);

        expect(wrapper.instance().props.statusText).to.be.equal(testStatus);

        const span = wrapper.find('span');
        expect(span).to.have.lengthOf(1);
        expect(span.hasClass(`current-status ${testStatus.get('type')}`)).to.equal(true);
        expect(span.text()).to.equal(testStatus.get('text'));
    });

    it('should render a loading spinner if loading', () => {
        const wrapper = mount(<CurrentStatus loading={true} statusText={testStatus} />);

        expect(wrapper.instance().props.loading).to.equal(true);
        expect(wrapper.find('span')).to.have.lengthOf(1);
        expect(wrapper.find('span').hasClass('loading')).to.equal(true);
        expect(wrapper.find('span').text()).to.equal(testStatus.get('text'));
    });
});

