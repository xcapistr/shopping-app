import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'

import Card from '../UI/Card'

const ProductItem = props => {
  const Touchable =
    Platform.OS === 'android' && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity

  return (
    <Card style={styles.container}>
      <Touchable onPress={props.onSelect} useForeground>
        <View style={styles.content}>
          <Image style={styles.img} source={{ uri: props.image }} />
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            {/* <Button
              color={Colors.primary}
              title="View Details"
              onPress={props.onSelect}
            />
            <Button
              color={Colors.primary}
              title="Add to Cart"
              onPress={props.onAddToCart}
            /> */}
            {props.children}
          </View>
        </View>
      </Touchable>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 20
  },
  content: {
    overflow: 'hidden',
    borderRadius: 10
  },
  img: {
    width: '100%',
    height: '60%'
  },
  details: {
    alignItems: 'center',
    height: '20%',
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '20%',
    paddingHorizontal: 20
  }
})

export default ProductItem
