import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import ActionSheet from './ActionSheet';
import { getApps } from './Apps';

class OpenMapManager {
  constructor() {
    this.props = [];

    getApps().then((apps) => {
      this.props.apps = apps;
    });
  }

  setCurrent(props, callback = () => {}) {
    if (!props) return;

    this.currentManager = new RootSiblings(<ActionSheet {...props} />);
  }

  create(props, callback = () => {}) {
    this.setCurrent(props, callback);
    this.props.push(props);
  }

  update = (props) => {
    this.props[this.props.length - 1] = props;
    this.currentManager.update(<ActionSheet {...props} />);
  }

  show = (options) => {
    this.create({ ...this.props, ...options });
  }
}

export default new OpenMapManager();
