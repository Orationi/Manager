import React, {Component} from 'react';
import moment from 'moment';

export default class SlavesList extends Component {
    render() {
      const {slaves} = this.props;

      return (<ol>
        {slaves.map((slave, index) => <li key={index}>{`${slave.name} - ${slave.lastActivity ? moment(slave.lastActivity).calendar() : 'not active'}`}</li>)}
      </ol>);
    }
}
