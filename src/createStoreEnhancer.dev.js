import { applyMiddleware, compose }  from 'redux';
import DevTools from './utils/DevTools.jsx';        
import promiseMiddleware from './middleware/promiseMiddleware';

const enhancer = compose(applyMiddleware(promiseMiddleware), DevTools.instrument());

export default enhancer;