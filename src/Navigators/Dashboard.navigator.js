import React, { Component } from 'react'
import { createStackNavigator, NavigationActions, StackActions, DrawerActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Octicons'

import DashboardScreen from '../Screens/Dashboard.screen'

const DashboardNavigator = createStackNavigator(
  {
    dashboardScreen: { screen: DashboardScreen }
  },
  {
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => {
      return {
        headerTransparent: true,
        headerLeft: (
          <Icon
            name="three-bars"
            size={30}
            color="black"
            style={{ paddingLeft: 20 }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        )
      }
    }
  }
)

export default DashboardNavigator
