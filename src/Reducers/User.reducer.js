import { api_url } from '../../app'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'LOGIN_FAIL'

export const CHECK_SESSION = 'CHECK_SESSION'
export const LOGOUT = 'LOGOUT'

export const GET_DATA = 'GET_DATA'
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
export const GET_DATA_FAIL = 'GET_DATA_FAIL'

export const GET_PROFILE_PATH = 'GET_PROFILE_PATH'
export const GET_PROFILE_PATH_SUCCESS = 'GET_PROFILE_PATH_SUCCESS'
export const GET_PROFILE_PATH_FAIL = 'GET_PROFILE_PATH_FAIL'

export default function UserReducer(state = {}, action) {
  let { type } = action
  console.log(type)

  if (type.startsWith('LOGIN')) {
    return processLogin(state, action)
  } else if (type.startsWith('REGISTER')) {
    return processRegister(state, action)
  } else if (type.startsWith('GET_DATA')) {
    return processUser(state, action)
  } else if (type.startsWith('GET_PROFILE_PATH')) {
    return processUserProfilePath(state, action)
  } else if (type === CHECK_SESSION) {
    return { ...state, login: action.payload }
  } else if (type === LOGOUT) {
    return {}
  } else {
    return state
  }
}

function processLogin(state, action) {
  let obj = {}

  switch (action.type) {
    case LOGIN:
      obj = { login: { logging: true } }
      break
    case LOGIN_SUCCESS:
      let { success, id, token } = action.payload.data
      if (success) {
        obj = {
          login: {
            logging: false,
            isLogged: true
          },
          auth: { id, token }
        }
      } else {
        obj = {
          login: {
            logging: false,
            error: 'Invalid Student Number and/or Access Code.'
          }
        }
      }
      break
    case LOGIN_FAIL:
      obj = {
        login: {
          logging: false,
          error: 'Error while fetching the data'
        }
      }
      break
  }

  return { ...state, ...obj }
}

function processRegister(state, action) {
  let obj = {}

  switch (action.type) {
    case REGISTER:
      obj = { register: { registering: true } }
      break
    case REGISTER_SUCCESS:
      let { success } = action.payload.data
      if (success) {
        obj = {
          register: {
            registering: false,
            registered: true
          }
        }
      } else {
        obj = {
          register: {
            registering: false,
            error: 'Already Exists.'
          }
        }
      }
      break
    case REGISTER_FAIL:
      obj = {
        register: {
          registering: false,
          error: 'Error while fetching the data'
        }
      }
      break
  }

  return { ...state, ...obj }
}

function processUser(state, action) {
  let obj = {}

  switch (action.type) {
    case GET_DATA:
      obj = { loading: true }
      break
    case GET_DATA_SUCCESS:
      let data = action.payload.data
      if (data.success) {
        data.info.ProfilePath = data.info.ProfileFileName
          ? `${api_url}/user/pictures/${data.info.ProfileFileName}`
          : null
        obj = {
          loading: false,
          data: data.info
        }
        break
      }
    case GET_DATA_FAIL:
      obj = {
        loading: false,
        error: 'Error while fetching user data'
      }
      break
  }

  return { ...state, info: obj }
}

function processUserProfilePath(state, action) {
  var obj = {}
  switch (action.type) {
    case GET_PROFILE_PATH:
      obj = { loading: true }
      break
    case GET_PROFILE_PATH_SUCCESS:
      let { ProfileFileName } = action.payload.data.info
      obj = {
        loading: false,
        path: ProfileFileName ? `${api_url}/user/pictures/${ProfileFileName}` : null
      }
      break
    case GET_PROFILE_PATH_FAIL:
      obj = {
        loading: false,
        error: 'Error while fetching user data'
      }
      break
  }

  return {
    ...state,
    drawer: obj
  }
}
