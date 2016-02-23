import request from 'axios';
import {postModuleVersionUrl} from '../api/modules.js';

// action name
export const POST_MODULE_VERSION = 'api/POST_MODULE_VERSION';

// action creator
export function postModuleVersion(moduleName, major, minor, build, revision, file) {
  return {
    type: POST_MODULE_VERSION,
    info: { name: moduleName, version: `${major}.${minor}.${build}.${revision}` },
    promise: request.post(
      postModuleVersionUrl(moduleName, major, minor, build, revision),
      file,
      { headers: { 'Content-Type': file.type } }
    )
  };
}


// reducer
export default function modulesReducer(state = {}, action) {
  if (action.error) {
    return state;
  }

  const {type} = action;

  switch (type) {
    case POST_MODULE_VERSION:
      const info = action.info;

      if (!info) return state;

      const newState = {
        ...state,
        uploads: {...(state && state.uploads)}
      };

      info.timestamp = new Date();
      newState.uploads[info.name] = info;
      return newState;

    default:
      return state;
  }
}
