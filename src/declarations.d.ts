declare module 'redux-promise' {
    import { Middleware, AnyAction } from 'redux';

    const reduxPromise: Middleware<{}, any, any>;
    export default reduxPromise;
}
