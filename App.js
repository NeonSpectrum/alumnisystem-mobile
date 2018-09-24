import React, { Component } from 'react'
import { Font, AppLoading } from 'expo'
import { YellowBox } from 'react-native'
import { setCustomText } from 'react-native-global-props'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import Sentry from 'sentry-expo'

import MainStack from './src/Stacks/Main.stack'

import UserReducer from './src/Reducers/User.reducer'
import UploadReducer from './src/Reducers/Upload.reducer'

import Loading from './src/Components/Loading.component'

import { api_url, dev_api_url } from './app'

YellowBox.ignoreWarnings(['Warning: Failed child context type: Invalid child context'])

Sentry.config('https://80923d6c9204492c9367b68adafca35b@sentry.io/1287183').install()

const API_URL = __DEV__ ? dev_api_url : api_url

const client = axios.create({
  baseURL: API_URL,
  responseType: 'json'
})

const appReducer = combineReducers({
  UserReducer,
  UploadReducer
})

const rootReducer = (state, action) => {
  console.log(action.type)

  if (action.type === 'INIT') {
    state = { UserReducer: { auth: state.UserReducer.auth } }
  }

  return appReducer(state, action)
}

const store = createStore(
  persistReducer(
    {
      key: 'root',
      storage
    },
    rootReducer
  ),
  applyMiddleware(axiosMiddleware(client), thunk)
)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
    })
    setCustomText({
      style: { fontFamily: 'open-sans' }
    })
    this.setState({ isReady: true })
  }

  render() {
    let { isReady } = this.state
    return isReady ? (
      <Provider store={store}>
        <PersistGate loading={<Loading background={true} />} persistor={persistStore(store)}>
          <MainStack />
        </PersistGate>
      </Provider>
    ) : (
      <Loading background={true} />
    )
  }
}

export { store, API_URL }
