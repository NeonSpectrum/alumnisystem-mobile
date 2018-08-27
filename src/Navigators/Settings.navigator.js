import React, { Component } from 'react'
import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Octicons'

import SettingsScreen from '../Screens/Settings.screen'

const SettingsNavigator = createStackNavigator(
  {
    settingsScreen: { screen: SettingsScreen }
  },
  {
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <Icon
          name="three-bars"
          size={30}
          color="black"
          style={{ paddingLeft: 20 }}
          onPress={() => navigation.openDrawer()}
        />
      )
    })
  }
)

export default SettingsNavigator
