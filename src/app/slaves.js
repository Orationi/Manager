import request from 'axios';
import {getSlavesUrl} from '../api/slaves.js';
import { normalize, arrayOf } from 'normalizr';
import {slaveSchema} from '../entities/slave.js';

// action name
export const GET_SLAVES = 'api/GET_SLAVES';

// action creator
export function getSlaves() {
  return {
    type: GET_SLAVES,
    promise: new Promise((resolve, reject) => {
      request.get(getSlavesUrl())
        .then(res => {
            const payload = normalize(res.data, arrayOf(slaveSchema));

            resolve(payload);
        })
        .catch(err => reject(err));
    })
  }
}

// reducer
export default function slavesReducer(state = [], {error, payload, type}) {
  if (error) {
    return state;
  }

  switch(type) {
    case GET_SLAVES:
      return payload && payload.result;
    default:
      return state;
  }
}
