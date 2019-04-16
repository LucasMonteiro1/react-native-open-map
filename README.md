# React Native Open Map
[![npm version](https://badge.fury.io/js/react-native-open-map.svg)](https://badge.fury.io/js/react-native-open-map) [![npm downloads](https://img.shields.io/npm/dt/react-native-open-map.svg)](https://npm-stat.com/charts.html?package=react-native-open-map)  
[![NPM](https://nodei.co/npm/react-native-open-map.png?downloads=true)](https://nodei.co/npm/react-native-open-map/)
---
Choose the application that will open the map

## Currently supported apps:

* Apple Maps – `apple-maps`
* Google Maps – `google-maps`
* Citymapper – `citymapper`
* Uber – `uber`
* Lyft – `lyft`
* Navigon – `navigon`
* The Transit App – `transit`
* Waze – `waze`
* Moovit - `moovit`

## Try it out
You can try out the [Open Map Example
](https://expo.io/@lucasmonteiro1/open-map-example) app to get a tease of the functionalities of this lib.

## Installation

```
npm install --save react-native-open-map
```
```
yarn add react-native-open-map
```

### A note about iOS 9+
As of iOS 9, your app needs to provide the `LSApplicationQueriesSchemes` key inside
Info.plist to specify the URL schemes with which the app can interact.

Just put this in your Info.plist depending on which apps you'd like to support.
Omitting these might mean that the library can't detect some of the maps apps installed by the user.

```plist
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>comgooglemaps</string>
  <string>citymapper</string>
  <string>uber</string>
  <string>lyft</string>
  <string>navigon</string>
  <string>transit</string>
  <string>waze</string>
  <string>moovit</string>
</array>
```
## Props
| Prop | Default | Type | Required |
| --- | --- | --- | --- |
| latitude | none | number/string | yes |
| longitude | none | number/string | yes |
| title |  "Location" | string | no |
| cancelText | "Cancel" | string | no |
| actionSheetTitle | none | string | no |
| actionSheetMessage | none | string | no |

## Usage

```javascript
import OpenMap from "react-native-open-map";

OpenMap.show({
  latitude: 40.778721,
  longitude: -73.968188,
});
```
```javascript
OpenMap.show({
  latitude: 40.778721,
  longitude: -73.968188,
  title: 'Central Park',
  cancelText: 'Close',
  actionSheetTitle: 'Chose app',
  actionSheetMessage: 'Available applications '
});
```

## Credits
This library is based on [react-native-map-link](https://github.com/includable/react-native-map-link).
