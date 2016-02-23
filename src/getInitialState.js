const getInitialState = () => global.__CLIENT__ ? window.__INITIAL_STATE__ : {};

export default getInitialState;