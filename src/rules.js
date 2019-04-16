/*global Promise*/
import { Linking } from 'react-native';

export const isAppInstalled = (app) => {
  return new Promise((resolve) => {
    Linking.canOpenURL(app).then((result) => {
      resolve(!!result);
    }).catch(() => {
      resolve(false);
    });
  });
};

export const getUrl = (app, lat, lng, title) => {
  if (app.name === 'apple-maps') {
    return `${app.prefixe}?ll=${lat},${lng}&q=${encodeURIComponent(title)}`;
  }
  if (app.name === 'google-maps') {
    return `${app.prefixe}?q=${lat},${lng}`;
  }
  if (app.name === 'citymapper') {
    return `${app.prefixe}directions?endcoord=${lat},${lng}&endname=${encodeURIComponent(title)}`;
  }
  if (app.name === 'uber') {
    title = `&dropoff[nickname]=${encodeURIComponent(title)}`;
    return `${app.prefixe}?action=setPickup&client_id=tDROEA84DI_9D2djgOt3L_JFCRAYTcvkB1m8RjO0&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}${title}`;
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
    return `${app.prefixe}directions?dest_lat=${lat}&dest_lon${lng}&dest_name=${encodeURIComponent(title)}`;
  }
};
