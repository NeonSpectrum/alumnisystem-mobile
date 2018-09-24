import React, { Component } from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, NavigationActions, SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import { MessageBarManager, MessageBar } from 'react-native-message-bar'

import LoginScreen from '../Screens/Login.screen'
import RegisterScreen from '../Screens/Register.screen'
import DrawerStack from '../Stacks/Drawer.stack.js'

if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(0)
}

const MainStack = createStackNavigator({
  loginScreen: { screen: LoginScreen },
  registerScreen: { screen: RegisterScreen },
  drawerStack: { screen: DrawerStack }
})

class Main extends Component {
  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert)
    this.checkForUpdates()
  }

  messageBarAlert(params) {
    MessageBarManager.showAlert({
      shouldHideOnTap: false,
      messageStyle: { color: 'white', fontSize: 12, textAlign: 'center' },
      ...params
    })
  }

  async checkForUpdates() {
    this.messageBarAlert({
      message: 'Checking for updates...',
      shouldHideAfterDelay: false
    })
    Expo.Updates.checkForUpdateAsync()
      .then(update => {
        if (update.isAvailable) {
          Alert.alert('New Update', 'An update is available. Download now?', [
            {
              text: 'Download',
              onPress: () => {
                Expo.Updates.fetchUpdateAsync({
                  eventListener: event => {
                    if (event.type === Expo.Updates.EventType.DOWNLOAD_STARTED) {
                      this.messageBarAlert({
                        message: 'Downloading...',
                        shouldHideAfterDelay: false
                      })
                    } else if (event.type === Expo.Updates.EventType.DOWNLOAD_FINISHED) {
                      MessageBarManager.hideAlert()
                      Alert.alert('Restart', 'Done installing the update. Restart now?', [
                        {
                          text: 'Restart',
                          onPress: () => {
                            Expo.Updates.reloadFromCache()
                          }
                        },
                        {
                          text: 'Cancel',
                          style: 'cancel'
                        }
                      ])
                    }
                  }
                })
              }
            },
            {
              text: 'Cancel',
              style: 'cancel'
            }
          ])
        } else {
          this.messageBarAlert({
            message: 'You are on the latest version.',
            alertType: 'success'
          })
        }
      })
      .catch(() => {
        this.messageBarAlert({
          message: 'There was an error checking for updates.',
          alertType: 'error'
        })
      })
  }

  render() {
    return [<MainStack key="1" />, <MessageBar ref="alert" key="2" />]
  }
}

export default Main
