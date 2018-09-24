import { ImagePicker, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'
import { API_URL } from '../../App'

export const UPLOAD = 'UPLOAD'
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const UPLOAD_FAIL = 'UPLOAD_FAIL'

export default function UploadReducer(state = {}, action) {
  switch (action.type) {
    case UPLOAD:
      return { ...state, loading: true }
    case UPLOAD_SUCCESS:
      let { success, filename } = action.payload.data
      if (success) {
        return {
          ...state,
          loading: false,
          path: `${API_URL}/user/pictures/${filename}`
        }
      }
    case UPLOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching user data'
      }
    default:
      return state
  }
}

export async function takePhoto() {
  const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA)

  const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

  if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    })
    return pickerResult.uri
  }
  return false
}

export function uploadPhoto(uri) {
  return (dispatch, getState) => {
    let fileType = uri.split('.').pop()

    let formData = new FormData()
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    })

    let { id } = getState().UserReducer.auth

    dispatch({
      type: UPLOAD,
      payload: {
        request: {
          method: 'PUT',
          url: `/user/${id}/upload/profile`,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }
      }
    })
  }
}

export function uploadSignature(uri) {
  return (dispatch, getState) => {
    let fileType = uri.split('.').pop()

    let formData = new FormData()
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    })

    let { id } = getState().UserReducer.auth

    dispatch({
      type: UPLOAD,
      payload: {
        request: {
          method: 'PUT',
          url: `/user/${id}/upload/signature`,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }
      }
    })
  }
}
