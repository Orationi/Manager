import React from 'react';
import { PropTypes } from 'react';
import SlavesList from './list.jsx';

export default class SlavesView extends React.Component {
  static propTypes = {
    slaves: PropTypes.array.isRequired,
    getSlaves: PropTypes.func
  };

  componentDidMount() {
    if (__CLIENT__ && typeof this.props.getSlaves === 'function') {
      this.timer = setInterval(() => { 
        this.props.getSlaves();
      }, 15000);
    }
  }
  
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  
  render() {
    const {slaves} = this.props;
    const activeSlaves = slaves.filter(s => s.lastActivity);
    
    return (<section>
      <h2>Active</h2>
      {!!activeSlaves.length && <SlavesList slaves={activeSlaves} />}
      {!activeSlaves.length && <p>No active slaves</p>}
      <h2>All</h2>
      {!!slaves.length && <SlavesList slaves={slaves} />}
      {!slaves.length && <p>No slaves</p>}
    </section>);
  }
}