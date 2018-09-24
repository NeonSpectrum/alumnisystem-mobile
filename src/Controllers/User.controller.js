import { LOGIN, GET_DATA, GET_PROFILE_PATH, CHECK_SESSION, LOGOUT, REGISTER, GET_CARDS } from '../Reducers/User.reducer'

import { AsyncStorage } from 'react-native'
import { API_URL } from '../../App'

export function login(id, code) {
  return {
    type: LOGIN,
    payload: {
      request: {
        method: 'POST',
        url: `/user/login`,
        data: {
          id,
          code
        }
      }
    }
  }
}

export function register(info) {
  return {
    type: REGISTER,
    payload: {
      request: {
        method: 'PUT',
        url: `/user/register`,
        data: info
      }
    }
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export function checkSession() {
  return (dispatch, getState) => {
    const { id, token } = getState().UserReducer.auth
    if (id && token) {
      dispatch({
        type: CHECK_SESSION,
        payload: {
          isLogged: true
        }
      })
    } else {
      dispatch({
        type: CHECK_SESSION,
        payload: {
          isLogged: false
        }
      })
    }
  }
}

export function fetchUserData() {
  return (dispatch, getState) => {
    const { id, token } = getState().UserReducer.auth
    dispatch({
      type: GET_DATA,
      payload: {
        request: {
          url: `/user/${id}/data`,
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      }
    })
  }
}

export function fetchProfilePath() {
  return (dispatch, getState) => {
    const { id, token } = getState().UserReducer.auth
    dispatch({
      type: GET_PROFILE_PATH,
      payload: {
        request: {
          url: `/user/${id}/data`,
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      }
    })
  }
}

export function fetchCard() {
  return (dispatch, getState) => {
    const { id, token } = getState().UserReducer.auth
    dispatch({
      type: GET_CARDS,
      payload: {
        request: {
          url: `/templates`,
          data: { id }
        }
      }
    })
  }
}
