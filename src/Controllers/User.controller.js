import { AsyncStorage } from 'react-native'
import { fetchJSON } from '../Functions'
import { api_url } from '../../app'

export function login(id, code) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetchJSON(api_url + '/user/login', {
        method: 'POST',
        body: JSON.stringify({
          id,
          code
        })
      })
      if (res.success) {
        await Promise.all([AsyncStorage.setItem('id', id), AsyncStorage.setItem('token', res.token)])
        resolve(res.token)
      } else {
        reject('Invalid Student Number and/or Access Code.')
      }
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

export function register(info) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetchJSON(api_url + '/user/register', {
        method: 'PUT',
        body: JSON.stringify(info)
      })
      if (res.success) {
        resolve()
      } else {
        reject('Already Exists!')
      }
    } catch (err) {
      reject(err)
    }
  })
}

export function getUserData() {
  return new Promise(async (resolve, reject) => {
    let [id, token] = await Promise.all([AsyncStorage.getItem('id'), AsyncStorage.getItem('token')])
    if (!id || !token) {
      reject('Session Expired!')
    }
    try {
      let res = await fetchJSON(`${api_url}/user/${id}/data`, {
        headers: {
          Authorization: 'Bearer ' + token
        },
        method: 'GET'
      })
      if (res.success) {
        res.data.ProfilePath = `${api_url}/user/pictures/${res.data.ProfileFileName}`
        resolve(res.data)
      } else {
        reject('Already Exists!')
      }
    } catch (err) {
      reject(err)
    }
  })
}

export async function logout() {
  await AsyncStorage.removeItem('auth')
}
