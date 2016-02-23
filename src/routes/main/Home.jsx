import React, { Component , PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {getSlaves} from '../../app/slaves';
import SlavesView from '../../ui/slaves/index.jsx';
import ModuleUploadConnected from '../../ui/modules/upload.jsx';

class Home extends Component {
  static propTypes = {
    slaves: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static initialActions = [ getSlaves ];

  render() {
    const { slaves, dispatch } = this.props;

    return (<div>
      <h1>Orationi.Manager Slaves</h1>
      <hr />
      <SlavesView slaves={slaves} {...bindActionCreators({getSlaves}, dispatch)} />
      <hr />
      <h1>Orationi.Manager Modules Upload</h1>
      <hr />
      <ModuleUploadConnected />
    </div>);
  }
}

export default connect(state => {
  const slaveIds = state.slaves;

  return {
    slaves: [...slaveIds].map(slaveId => state.entities.slaves[slaveId])
  };
})(Home)
