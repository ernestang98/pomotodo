import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import SwitchComponent from './components/SwitchComponent';

class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <SwitchComponent/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;