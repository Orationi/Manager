import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import moment from 'moment';

import {postModuleVersion} from '../../app/modules.js';

const NONAME = '<noname>';

export class ModuleUpload extends Component {
  static propTypes = {
    postModuleVersion: PropTypes.func,
    uploads: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      name: NONAME,
      version: {major: 0, minor: 0, build: 0, revision: 0},
      file: null
    };
  }

  _tryParseVersion(value) {
    const match = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.exec(value);
    if (match && match.length) {
      return {
        major: +match[1],
        minor: +match[2],
        build: +match[3],
        revision: +match[4]
      };
    }

    return null;
  }

  handleDrop(files) {
    if (!files.length) return;
    const file = files[0];
    this.setState({file: file});
    if (this.state.name === NONAME || !this.state.name) {
      this.setState({name: file.name.replace(/\..+$/, '') || file.name});
    }
  }

  handleVersionChange() {
    const input = this.refs.versionInput;
    const value = input && input.value;
    this.setState({ version: this._tryParseVersion(value) });
  }

  handleClick(e) {
    if (e && e.preventDefault) e.preventDefault();
    const post = this.props.postModuleVersion;
    const {name, version, file} = this.state;

    if (!version || !file || !name) {
      throw new Error();
    }

    const {major, minor, build, revision} = version;

    post(name, major, minor, build, revision, file);
  }

  // TODO: make form POSTable without js
  render() {
    const versionIncorrect = !this.state.version;
    const disabled = versionIncorrect || !this.state.file;
    const uploads = this.props.uploads;

    return (<section>
      <form encType="multipart/form-data">
        <Dropzone onDrop={ this.handleDrop.bind(this) } size={ 150 }>
          <div>
            Drop module here or click to choose!
          </div>
        </Dropzone>
        <div>
          <label>Version:</label>
          <input type="text" defaultValue="0.0.0.0"
            placeholder="major.minor.build.revision" ref="versionInput"
            onChange={this.handleVersionChange.bind(this)}
            onKeyDown={this.handleVersionChange.bind(this)} />
          {versionIncorrect && <span>incorrect</span>}
        </div>
        <button type="submit" onClick={this.handleClick.bind(this)}
          disabled={disabled}>
          Upload
        </button>
      </form>
      {uploads && Object.keys(uploads).length && <article>
        <h2>Successfull uploads</h2>
        <ul>
          {Object.keys(uploads).map(u => (<li>
              {uploads[u].name} version {uploads[u].version} uploaded {moment(uploads[u].timestamp).calendar()}
            </li>))}
        </ul>
      </article>}
    </section>);
  }
}


const ModuleUploadConnected = connect(state => ({
  uploads: state.modules && state.modules.uploads
}),
{
  postModuleVersion: postModuleVersion
})(ModuleUpload);

export default ModuleUploadConnected;
