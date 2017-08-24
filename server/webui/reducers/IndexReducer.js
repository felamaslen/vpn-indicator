import buildReducer from './reducerBuilder';
import { HELLO_WORLD } from '../constants/actions';

const initialState = {
    message: 'Hello default message'
};

export default buildReducer(initialState, [
    {
        type: HELLO_WORLD,
        state: {
            message: 'Clicked!'
        }
    }
]);

