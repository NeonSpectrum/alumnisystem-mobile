import React, { Component } from 'react'
import { Font, AppLoading } from 'expo'
import { setCustomText } from 'react-native-global-props'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import MainStack from './src/Stacks/Main.stack'
import UserReducer from './src/Reducers/User.reducer'
import UploadReducer from './src/Reducers/Upload.reducer'

import Loading from './src/Components/Loading.component'

import { api_url } from './app'

const client = axios.create({
  baseURL: api_url,
  responseType: 'json'
})

const reducers = combineReducers({
  UserReducer,
  UploadReducer
})

const store = createStore(
  persistReducer(
    {
      key: 'root',
      storage
    },
    reducers
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

export { store }
