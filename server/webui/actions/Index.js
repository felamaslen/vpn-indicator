import buildAction from './actionBuilder';
import { HELLO_WORLD } from '../constants/actions';

export default {
    helloWorld: buildAction(HELLO_WORLD)
}

