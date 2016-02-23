import { applyMiddleware }  from 'redux';
import DevTools from './utils/DevTools.jsx';        
import promiseMiddleware from './middleware/promiseMiddleware';

const enhancer = applyMiddleware(promiseMiddleware);
export default enhancer;