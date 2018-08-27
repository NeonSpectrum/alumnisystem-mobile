import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PTRView from 'react-native-pull-to-refresh'
import Icon from 'react-native-vector-icons/Octicons'

export default class Error extends Component {
  render() {
    return (
      <PTRView
        onRefresh={this.props.onRefresh}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Icon name="alert" size={80} color="#f00" />
        <Text style={{ fontSize: 20, marginTop: 20 }}>{this.props.text}</Text>
      </PTRView>
    )
  }
}
