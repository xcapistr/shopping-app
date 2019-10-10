import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { composeWithDevTools } from 'redux-devtools-extension'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({ products: productsReducer, cart: cartReducer })
const store = createStore(rootReducer, composeWithDevTools())

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
