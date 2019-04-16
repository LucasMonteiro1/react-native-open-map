import { Platform, Linking } from 'react-native';
import { GoogleMaps, AppleMaps, CityMapper, Uber, Lyft, Transit, Waze, Moovit } from './img';

const apps = [
  { name: 'apple-maps', title: 'Apple Maps', prefixe: (Platform.OS === 'ios') ? 'http://maps.apple.com/' : 'applemaps://', icon: AppleMaps },
  { name: 'google-maps', title: 'Google Maps', prefixe: (Platform.OS === 'ios') ? 'comgooglemaps://' : 'https://maps.google.com/', icon: GoogleMaps },
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

export const getApps = () => {
  const promises = apps.map((app) => isAppInstalled(app.prefixe).then((ret) => (ret) ? app : null));

  return Promise.all(promises).then((returnPromises) => {
    return returnPromises.filter((app) => (app));
  });
}
