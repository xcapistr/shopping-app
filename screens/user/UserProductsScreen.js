import React from 'react'
import { FlatList, Button, Platform, Alert, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch()
  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id })
  }
  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you realy want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id))
        }
      }
    ])
  }

  if (userProducts.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No products found, maybe start creating some</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          title={itemData.item.title}
          onSelect={() => {
            editProductHandler(itemData.item.id)
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id)
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id)
            }}
          />
        </ProductItem>
      )}
    />
  )
}

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'User Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => navData.navigation.navigate('EditProduct')}
        />
      </HeaderButtons>
    )
  }
}
export default UserProductsScreen
