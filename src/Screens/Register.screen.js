import React, { Component } from 'react'
import { NavigationActions, StackActions } from 'react-navigation'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Keyboard
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Loading from '../Components/Loading.component.js'
import { connect } from 'react-redux'

import { register } from '../Controllers/User.controller'

class RegisterScreen extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: '#fff'
  }

  constructor(props) {
    super(props)
    this.state = {
      info: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showCalendar = this.showCalendar.bind(this)
    this.applyCalendar = this.applyCalendar.bind(this)
    this.hideCalendar = this.hideCalendar.bind(this)
  }

  componentWillReceiveProps(props) {
    let { registered, error } = props
    if (registered) {
      alert('Registered Successfully!')
      props.navigation.goBack()
    } else if (error) {
      alert(error)
    }
  }

  handleChange(name, value) {
    this.setState(prevState => ({
      info: {
        ...prevState.info,
        [name]: value
      }
    }))
  }

  handleSubmit() {
    let { info } = this.state
    let { id, code, firstname, lastname, birthday, course, yearGraduated } = info
    if (!id || !code || !firstname || !lastname || !birthday || !course || !yearGraduated) {
      alert('Please fill out all fields.')
    } else {
      info.birthday = moment(info.birthday).format('YYYY-MM-DD')
      this.props.register(info)
    }
  }

  showCalendar() {
    Keyboard.dismiss()
    this.setState({
      calendar: true
    })
  }

  applyCalendar(e) {
    this.setState(prevState => ({
      info: {
        ...prevState.info,
        birthday: e
      }
    }))
    this.hideCalendar
  }

  hideCalendar() {
    this.setState({
      calendar: false
    })
  }

  render() {
    let { calendar, info } = this.state
    let { registering } = this.props
    return (
      <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.headerText}>Registration Page</Text>
          <Text style={styles.label}>Student Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Student Number"
            keyboardType="numeric"
            maxLength={11}
            onChangeText={e => this.handleChange('id', e)}
            underlineColorAndroid="transparent"
            selectTextOnFocus
            clearButtonMode="while-editing"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Access Code"
            onChangeText={e => this.handleChange('code', e)}
            underlineColorAndroid="transparent"
            selectTextOnFocus
            clearButtonMode="while-editing"
            secureTextEntry
            onSubmitEditing={this.handleSubmit}
          />
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={e => this.handleChange('firstname', e)}
            underlineColorAndroid="transparent"
            selectTextOnFocus
            clearButtonMode="while-editing"
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={e => this.handleChange('lastname', e)}
            underlineColorAndroid="transparent"
            selectTextOnFocus
            clearButtonMode="while-editing"
          />
          <Text style={styles.label}>Birthday</Text>
          <TouchableOpacity
            style={{
              alignSelf: 'stretch'
            }}
            onPress={this.showCalendar}
            activeOpacity={1}
          >
            <TextInput
              ref={ref => (this.birthdayInput = ref)}
              style={styles.input}
              placeholder="Birthday"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              editable={false}
              value={info.birthday ? moment(info.birthday).format('MMMM D, YYYY') : ''}
            />
          </TouchableOpacity>
          <Text style={styles.label}>Course</Text>
          <TextInput
            style={styles.input}
            placeholder="Course"
            onChangeText={e => this.handleChange('course', e)}
            underlineColorAndroid="transparent"
            selectTextOnFocus
            clearButtonMode="while-editing"
          />
          <Text style={styles.label}>Year Graduated</Text>
          <TextInput
            style={styles.input}
            placeholder="Year Graduated"
            keyboardType="numeric"
            maxLength={4}
            onChangeText={e => this.handleChange('yearGraduated', e)}
            underlineColorAndroid="transparent"
            selectTextOnFocus
            clearButtonMode="while-editing"
          />
          <DateTimePicker isVisible={calendar} onConfirm={this.applyCalendar} onCancel={this.hideCalendar} />
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit} disabled={registering}>
            <Text style={styles.buttonText}>{registering ? 'Processing...' : 'Register'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 50
  },
  background: {
    flex: 1,
    height: null,
    width: null
  },
  headerText: {
    color: '#fff',
    fontSize: 35,
    marginBottom: 50
  },
  label: {
    color: '#fff',
    fontSize: 20
  },
  input: {
    alignSelf: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 40,
    height: 50
  },
  pickerContainer: {
    borderRadius: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
    marginBottom: 20
  },
  picker: {
    alignSelf: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#fff'
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#F03434',
    padding: 20,
    alignItems: 'center',
    elevation: 1,
    borderRadius: 40
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  registerText: {
    marginTop: 10,
    color: '#fff'
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
})

const mapStateToProps = ({ UserReducer }) => {
  let { register } = UserReducer
  return register || {}
}

const mapDispatchToProps = {
  register
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen)
