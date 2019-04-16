// /*global Promise*/
import React, { Component } from 'react';
// import { Linking } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
// import apps from './apps';
// import { isAppInstalled, getUrl } from './rules';
/*
const choiceApp = (cancelText = 'Cancel') => {
  const promises = apps.map((app) => isAppInstalled(app.prefixe).then((ret) => (ret) ? app : null));

  return Promise.all(promises).then((returnPromises) => {
    return returnPromises.filter((app) => (app));
  }).then((availableApps) => {
    if (availableApps.length <= 1) {
      return availableApps[0] || null;
    }

    return new Promise((resolve) => {
      const actionSheetItems = availableApps.map((app, index) => (
        <ActionSheetItem
          index={index}
          key={app.name}
          text={app.title}
          value={app}
          showSelectedIcon={false}
          icon={app.icon}
          style={{ paddingTop: 12, paddingBottom: 12 }}
        />
      ));

      actionSheetItems.push(
        <ActionSheetItem
          index={-1}
          key={-1}
          text={cancelText}
          value={cancelText}
          showSelectedIcon={false}
          style={{ paddingTop: 12, paddingBottom: 12, alignSelf: 'center' }}
          textStyle={{ color: '#0066ff' }}
        />
      );

      const options = {
        children: actionSheetItems,
        position: 'bottom',
        multiple: false,
        showSparator: true,
        showSelectedIcon: false,
        hideOnSelceted: true,
        onChange: (value, index, selectedData) => resolve(value),
      };

      ActionSheetManager.show(options);
    });
  });
};

export const openMap = (options) => {
  if (!options || typeof options !== 'object') {
    throw new Error('First parameter of `openMap` should contain object with options.');
  }
  if (!('latitude' in options) || !('longitude' in options)) {
    throw new Error('First parameter of `openMap` should contain object with at least keys `latitude` and `longitude`.');
  }
  if ('title' in options && options.title && typeof options.title !== 'string') {
    throw new Error('Option `title` should be of type `string`.');
  }

  const lat = parseFloat(options.latitude);
  const lng = parseFloat(options.longitude);
  const title = (options.title) ? options.title : 'Location';

  return choiceApp(options.cancelText).then((app) => {
    const url = getUrl(app, lat, lng, title);

    if (url) {
      return Linking.openURL(url);
    }
  });
};
*/
export default class OpenMap extends Component {
  showActionSheet = () => {
    this.ActionSheet.show()
  }

  render() {
    return(
      <View>
        <Text onPress={this.showActionSheet}>Open ActionSheet</Text>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Which one do you like ?'}
          options={['Apple', 'Banana', 'cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => { /* do something */ }}
        />
      </View>
    );
  }
}
