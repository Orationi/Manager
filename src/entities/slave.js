import { normalize, Schema } from 'normalizr';

export const slaveSchema = new Schema('slaves', { idAttribute: 'Id' }); 

export function slaveMap(apiSlave) {
    if (!apiSlave) {
        return null;
    }
    
    return {
      id: apiSlave.Id,
      name: apiSlave.Name,
      address: apiSlave.Address,
      description: apiSlave.Description,
      lastActivity: apiSlave.LastActivity 
    };
}

export default function slaveReducer(state = {}, {err, type, payload}) {
    if (err) {
        return state;
    }

    const entitiesObj = payload && payload.entities && payload.entities.slaves;
    
    if (!entitiesObj) {
        return state;
    }
    const res = {};
    
    for (const key in entitiesObj) {
      if (entitiesObj.hasOwnProperty(key)) {
        res[key] = slaveMap(entitiesObj[key]);
      }
    } 
    
    return Object.keys(res).length ? res : state;
}