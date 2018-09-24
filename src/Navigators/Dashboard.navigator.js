import React, { Component } from 'react'
import { createStackNavigator, NavigationActions, StackActions, DrawerActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Octicons'

import DashboardScreen from '../Screens/Dashboard.screen'
import SignatureScreen from '../Screens/Signature.screen'

const DashboardNavigator = createStackNavigator(
  {
    dashboardScreen: { screen: DashboardScreen },
    signatureScreen: { screen: SignatureScreen }
  },
  {
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => {
      return {
        headerTransparent: true,
        headerLeft:
          navigation.state.routeName === 'dashboardScreen' ? (
            <Icon
              name="three-bars"
              size={30}
              color="black"
              style={{ paddingLeft: 20 }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          ) : (
            <Icon
              name="chevron-left"
              size={30}
              color="black"
              style={{ paddingLeft: 20 }}
              onPress={() => navigation.pop()}
            />
          )
      }
    }
  }
)

export default DashboardNavigator
