import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'

import Error from '../Components/Error.component'

class SettingsScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Error text="Work in progress..." />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SettingsScreen
