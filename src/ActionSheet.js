import React, { Component } from 'react';
import { Linking } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { getUrl } from './url';

export default class OpenMap extends Component {
  componentDidMount() {
    const { apps } = this.props;

    if (apps.length > 1) {
      this.ActionSheet.show();
    } else if (apps.length === 1) {
      this.openApp(0);
    }
  }

  openApp = (index) => {
    const { apps, latitude, longitude, title } = this.props;
    const app = apps[index];

    if (app) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      const url = getUrl(app, lat, lng, title || 'Location');
      if (url) {
        return Linking.openURL(url);
      }
    }
  }

  render() {
    const { apps, cancelText, actionSheetTitle, actionSheetMessage } = this.props;

    if (apps.length === 0) return null;
    const options = apps.map((app) => app.title);
    options.push(cancelText || 'Cancel');

    return(
      <ActionSheet
        ref={(ref) => this.ActionSheet = ref}
        options={options}
        title={actionSheetTitle}
        message={actionSheetMessage}
        cancelButtonIndex={options.length - 1}
        destructiveButtonIndex={options.length - 1}
        onPress={this.openApp}
      />
    );
  }
}
