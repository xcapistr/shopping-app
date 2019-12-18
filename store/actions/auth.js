import { AsyncStorage } from 'react-native'

export const AUTHENTICATE = 'AUTHENTICATE'

export const authenticate = (userId, token) => {
    return {type: AUTHENTICATE, userId, token}
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token,
        userId,
        expirationDate: expirationDate.toISOString()
      })
    )
  }

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLg47rM5Ex2RrN2C3uX5QdyswP8is35rU',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    )

    if (!response.ok) {
      const errorResData = await response.json()
      let message = 'Something went wrong!'
      const errorId = errorResData.error.message
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!'
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!'
      }
      throw new Error(message)
    }

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    const resData = await response.json()
    console.log(resData)
    dispatch(authenticate(resData.localId, resData.idToken))
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    )
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLg47rM5Ex2RrN2C3uX5QdyswP8is35rU',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    )

    if (!response.ok) {
      const errorResData = await response.json()
      let message = 'Something went wrong!'
      const errorId = errorResData.error.message
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!'
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!'
      }
      throw new Error(message)
    }

    const resData = await response.json()
    dispatch(authenticate(resData.localId, resData.idToken))
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    )
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}


