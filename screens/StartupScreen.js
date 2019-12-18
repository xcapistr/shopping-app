import React, { useEffect } from 'react'
import { StyleSheet, View, AsyncStorage, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import * as authActions from '../store/actions/auth'

const StartupScreen = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      if (!userData) {
        props.navigation.navigate('Auth')
        return
      }

      const trasnformedData = JSON.parse(userData)
      const { token, userId, expirationDate } = trasnformedData
      const expirationDateObject = new Date(expirationDate)

      if (expirationDateObject <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth')
        return
      }

      props.navigation.navigate('Shop')
      dispatch(authActions.authenticate(userId, token))
    }
    tryLogin()
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default StartupScreen
