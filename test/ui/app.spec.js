import { expect } from 'chai';

import { Map as map } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../server/webui/containers/App';

const mockDispatcher = () => null;

describe('<App/>', () => {
    const wrapper = shallow(<App
        dispatch={mockDispatcher}
        loading={false}
        checkTimeout={5}
        vpnStatus={map({ text: 'foo', type: 'bar', status: null })}
        langCode="en_GB"
        textToggleButton="Toggle"
    />);

    it('should have a container element', () => {
        const title = wrapper.find('div.container');
        expect(title).to.have.lengthOf(1);
    });

    it('should render a toggle button', () => {
        const button = wrapper.find('button.btn button.btn-primary button.toggle-btn');
        expect(button).to.have.lengthOf(1);
    });
});

