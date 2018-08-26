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
  AsyncStorage
} from 'react-native'
import Loading from '../Components/Loading.component.js'
import { login } from '../Controllers/User.controller'

class LoginScreen extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      code: null,
      logging: false,
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let [id, token] = await Promise.all([AsyncStorage.getItem('id'), AsyncStorage.getItem('token')])
    this.setState({ loading: false }, () => {
      if (id && token) {
        this.goToDrawer()
      }
    })
  }

  goToDrawer() {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'drawerStack' })]
      })
    )
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit() {
    let { id, code } = this.state
    this.setState({ logging: true })
    login(id, code)
      .then(() => {
        this.setState({ logging: false }, () => {
          this.goToDrawer()
        })
      })
      .catch(err => {
        this.setState({ logging: false })
        alert(err)
      })
  }

  render() {
    let { logging, loading } = this.state
    return loading ? (
      <Loading />
    ) : (
      <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.logoText}>ALUMNI</Text>
          </View>
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
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit} disabled={logging}>
            <Text style={styles.buttonText}>{logging ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            Haven't sign up yet?{' '}
            <Text
              style={styles.link}
              onPress={() => {
                this.props.navigation.navigate('registerScreen')
              }}
            >
              Create a new account.
            </Text>
          </Text>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40
  },
  background: {
    flex: 1,
    height: null,
    width: null
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 60,
    marginTop: -40
  },
  logoText: {
    color: '#fff',
    fontSize: 35,
    position: 'absolute',
    bottom: 30,
    fontWeight: '100'
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

export default LoginScreen
