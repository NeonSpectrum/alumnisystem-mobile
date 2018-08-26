import React, { Component } from 'react'
import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Octicons'

import DashboardScreen from '../Screens/Dashboard.screen'

const DashboardNavigator = createStackNavigator(
  {
    dashboardScreen: { screen: DashboardScreen }
  },
  {
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <Icon
          name="three-bars"
          size={30}
          color="white"
          style={{ paddingLeft: 20 }}
          onPress={() => navigation.openDrawer()}
        />
      )
    })
  }
)

export default DashboardNavigator
