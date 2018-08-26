import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { login } from '../Controllers/User.controller'

class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        id: null,
        code: null
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let { name, value } = e.target
    this.setState({
      credentials: {
        [name]: value
      }
    })
  }

  async handleSubmit() {
    let { credentials } = this.state
    login(credentials.id, credentials.code)
      .then(() => {
        alert('Login Successfully!')
      })
      .catch(err => {
        alert(err)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Student Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Student Number"
          onChangeText={this.handleChange}
          underlineColorAndroid="transparent"
          selectTextOnFocus
          clearButtonMode="while-editing"
        />
        <Text>Password</Text>
        <TextInput
          placeholder="Access Code"
          onChangeText={pass => this.setState({ pass })}
          underlineColorAndroid="transparent"
          selectTextOnFocus
          clearButtonMode="while-editing"
          secureTextEntry
          onSubmitEditing={this.handleSubmit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D91E18',
    paddingLeft: 40,
    paddingRight: 40
  }
})

export default RegisterScreen
