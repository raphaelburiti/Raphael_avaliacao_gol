import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
      <View />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#448aff',
    padding: 30,
  },
  area: {
    // flex: 0.25,
    // backgroundColor: '#ffffff88',
  },
});
