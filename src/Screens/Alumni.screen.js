import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'

class AlumniScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Alumni</Text>
        </View>
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

export default AlumniScreen
