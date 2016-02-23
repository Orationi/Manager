import {API_URL} from './api.js';

export const postModuleVersionUrl = (module, major, minor, build, revision) =>
  `${API_URL}/module/${module}/version/${major}/${minor}/${build}/${revision}/`;
