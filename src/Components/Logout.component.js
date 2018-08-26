import React, { Component } from 'react'
import { Alert } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { logout } from '../Controllers/User.controller.js'

export function processLogout(props) {
  Alert.alert('Logout', 'Are you sure do you want to logout?', [
    {
      text: 'OK',
      onPress: async () => {
        await logout()
        props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
          })
        )
      }
    },
    {
      text: 'Cancel',
      style: 'cancel'
    }
  ])
}
