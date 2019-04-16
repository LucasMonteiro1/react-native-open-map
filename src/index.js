import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import OpenMap from './OpenMap';

export default class ActionSheetManager {
  constructor() {
    this.props = [];
  }

  setCurrent(props, callback = () => {}) {
    if (!props) return;

    this.currentOpenMap = new RootSiblings(<OpenMap {...props} />);
  }

  create(props, callback = () => {}) {
    this.setCurrent(props, callback);
    this.props.push(props);
  }

  update = (props) => {
    this.props[this.props.length - 1] = props;
    this.currentActionSheet.update(<ActionSheet {...props} />);
  }

  openMap = (options) => {
    this.create(props);
  }
}
