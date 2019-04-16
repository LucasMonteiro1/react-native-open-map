import { Platform } from 'react-native';
import { GoogleMaps, AppleMaps, CityMapper, Uber, Lyft, Transit, Waze, Moovit } from './img';

export const apps = [
  { name: 'apple-maps', title: 'Apple Maps', prefixe: (Platform.OS === 'ios') ? 'http://maps.apple.com/' : 'applemaps://', icon: AppleMaps },
  { name: 'google-maps', title: 'Google Maps', prefixe: (Platform.OS === 'ios') ? 'comgooglemaps://' : 'https://maps.google.com/', icon: GoogleMaps },
  { name: 'citymapper', title: 'Citymapper', prefixe: 'citymapper://', icon: CityMapper },
  { name: 'uber', title: 'Uber', prefixe: 'uber://', icon: Uber },
  { name: 'lyft', title: 'Lyft', prefixe: 'lyft://', icon: Lyft },
  { name: 'transit', title: 'The Transit App', prefixe: 'transit://', icon: Transit },
  { name: 'waze', title: 'Waze', prefixe: 'waze://', icon: Waze },
  { name: 'moovit', title: 'Moovit', prefixe: 'moovit://', icon: Moovit },
];
