import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import OpenMap from 'react-native-open-map';

export default function App() {
  const openA = () => {
    OpenMap.show({
      latitude: 40.778721,
      longitude: -73.968188,
    });
  }

  const openB = () => {
    OpenMap.show({
      alatitude: 40.778721,
      longitude: -73.968188,
      title: 'Central Park',
      cancelText: 'Close',
      actionSheetTitle: 'Chose app',
      actionSheetMessage: 'Available applications'
    });
  }

  return (
    <View style={styles.container}>
      <Text>React Native Open Map</Text>

      <TouchableHighlight onPress={openA} style={styles.button}>
        <Text>A</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={openB} style={styles.button}>
        <Text>B</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#a6a6a6',
    margin: 10,
    width: '50%',
    alignItems: 'center',
  },
});