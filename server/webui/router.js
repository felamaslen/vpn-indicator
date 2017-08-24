/*
 * React-redux router object
 */

// import main containers here
import Index from './containers/Index';

export default [
    {
        path: '/',
        component: Index,
        initState: Index.initState,
        exact: false
    }
];

