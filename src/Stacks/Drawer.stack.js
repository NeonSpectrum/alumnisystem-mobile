import Expo from 'expo'
import React, { Component } from 'react'
import { DrawerItems, StackActions, NavigationActions } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { store } from '../../App'

import Loading from '../Components/Loading.component.js'

import DashboardNavigator from '../Navigators/Dashboard.navigator'
import SettingsNavigator from '../Navigators/Settings.navigator'
import AlumniNavigator from '../Navigators/Alumni.navigator'

import { fetchProfilePath, logout } from '../Controllers/User.controller'

var uri = require('../../assets/user-default.png')

const DrawerContent = props => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image style={styles.picture} source={uri} />
      </View>
      <DrawerItems
        {...props}
        onItemPress={({ route, focused }) => {
          if (route.key === 'Logout') {
            Alert.alert('Logout', 'Are you sure do you want to logout?', [
              {
                text: 'OK',
                onPress: async () => {
                  store.dispatch(logout())
                  Expo.Util.reload()
                }
              },
              {
                text: 'Cancel',
                style: 'cancel'
              }
            ])
          } else {
            props.onItemPress({ route, focused })
          }
        }}
      />
      <View style={styles.footer}>
        <Image style={styles.logo} source={require('../../assets/rnd-logo.png')} />
        <Text style={styles.footerText}>This is made in collaboration with</Text>
        <Text style={styles.footerText}>UE CCSS Research and Development Unit</Text>
      </View>
    </View>
  )
}

const DrawerStack = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardNavigator
    },
    Settings: {
      screen: SettingsNavigator
    },
    'Alumni Card Preview': {
      screen: AlumniNavigator
    },
    Logout: {
      screen: () => {
        return <View />
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: '#F4054B'
    },
    contentComponent: DrawerContent
  }
)

class Drawer extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props)
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.props.fetchProfilePath()
  }

  render() {
    let { loading = true, error } = this.props
    if (loading) return <Loading />
    else if (error) return <Error text="Cannot connect to server!" onRefresh={this.fetchData} />
    else return <DrawerStack />
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F4054B',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10
  },
  logo: {
    height: 50,
    width: 56
  },
  footerText: {
    fontSize: 12
  },
  picture: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ccc'
  },
  buttonList: {
    paddingVertical: 10
  }
})

const mapStateToProps = ({ UserReducer, UploadReducer }) => {
  let { drawer } = UserReducer
  if (drawer || UploadReducer.path) {
    if (UploadReducer.path) uri = { uri: UploadReducer.path }
    else if (drawer.path) uri = { uri: drawer.path }

    return { loading: drawer.loading || UploadReducer.loading || false }
  }
  return {}
}

const mapDispatchToProps = {
  fetchProfilePath,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer)
