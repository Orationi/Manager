import { createStore,
         combineReducers } from 'redux';
import getInitialState from './getInitialState';

import slavesReducer from './app/slaves.js';
import slaves from './entities/slave.js';
import modulesReducer from './app/modules.js';

const enhancer = (process.env.NODE_ENV === 'production')
    ? require('./createStoreEnhancer.prod').default
    : require('./createStoreEnhancer.dev').default;

const reducer = combineReducers({
  entities: combineReducers({
    slaves: slaves
  }),
  slaves: slavesReducer,
  modules: modulesReducer
});

const createApplicationStore = () => createStore(reducer, getInitialState(), enhancer);

export default createApplicationStore;
