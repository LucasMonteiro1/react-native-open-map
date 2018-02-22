/*global Promise*/
import React from 'react';
import { Platform, Linking } from 'react-native';
import ActionSheetManager, { ActionSheetItem } from 'react-native-action-sheet-component';
import { GoogleMaps, AppleMaps, CityMapper, Uber, Lyft, Transit, Waze, Moovit } from './img';

const isIOS = (Platform.OS === 'ios');

const apps = [
  { name: 'apple-maps', title: 'Apple Maps', prefixe: (isIOS) ? 'http://maps.apple.com/' : 'applemaps://', icon: AppleMaps },
  { name: 'google-maps', title: 'Google Maps', prefixe: (isIOS) ? 'comgooglemaps://' : 'https://maps.google.com/', icon: GoogleMaps },
  { name: 'citymapper', title: 'Citymapper', prefixe: 'citymapper://', icon: CityMapper },
  { name: 'uber', title: 'Uber', prefixe: 'uber://', icon: Uber },
  { name: 'lyft', title: 'Lyft', prefixe: 'lyft://', icon: Lyft },
  { name: 'transit', title: 'The Transit App', prefixe: 'transit://', icon: Transit },
  { name: 'waze', title: 'Waze', prefixe: 'waze://', icon: Waze },
  { name: 'moovit', title: 'Moovit', prefixe: 'moovit://', icon: Moovit },
];

const isAppInstalled = (app) => {
  return new Promise((resolve) => {
    Linking.canOpenURL(app).then((result) => {
      resolve(!!result);
    }).catch(() => {
      resolve(false);
    });
  });
};

const choiceApp = (cancelText = 'cancel') => {
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
          style={{ paddingTop: 10, paddingBottom: 10 }}
        />
      ));

      actionSheetItems.push(
        <ActionSheetItem
          index={-1}
          key={-1}
          text={'Cancel'}
          value={cancelText}
          showSelectedIcon={false}
          style={{ paddingTop: 10, paddingBottom: 10 }}
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
  const title = (options.title) ? options.title : 'Open in Maps';

  return choiceApp(options.cancelText).then((app) => {
    const url = getUrl(app, lat, lng, title);

    if (url) {
      return Linking.openURL(url);
    }
  });
};

const getUrl = (app, lat, lng, title) => {
  if (app.name === 'apple-maps') {
    return `${app.prefixe}?ll=${lat},${lng}&q=${encodeURIComponent(title || 'Location')}`;
  }
  if (app.name === 'google-maps') {
    const location = (isIOS) ? `?api=1&ll=${lat},${lng}&q=%{encodeURIComponent(title || 'Location')}` : `?q=${lat},${lng}`;
    return `${app.prefixe}${location}`;
  }
  if (app.name === 'citymapper') {
    title = (title) ? `&endname=${encodeURIComponent(title)}` : '';
    return `${app.prefixe}directions?endcoord=${lat},${lng}${title}`;
  }
  if (app.name === 'uber') {
    title = (title) ? `&dropoff[nickname]=${encodeURIComponent(title)}` : '';
    return `${app.prefixe}?action=setPickup&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]${lng}${title}`;
  }
  if (app.name === 'lyft') {
    return `${app.prefixe}ridetype?id=lyft&destination[latitude]=${lat}&destination[longitude]=${lng}`;
  }
  if (app.name === 'transit') {
    return `${app.prefixe}directions?to=${lat},${lng}`;
  }
  if (app.name === 'waze') {
    return `${app.prefixe}?ll=${lat},${lng}&navigate=yes`;
  }
  if (app.name === 'moovit') {
    title = (title) ? `&dest_name=${encodeURIComponent(title)}` : '';
    return `${app.prefixe}directions?dest_lat=${lat}&dest_lon${lng}`;
  }
};
