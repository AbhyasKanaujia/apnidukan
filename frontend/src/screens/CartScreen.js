import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'

const CartScreen = () => {
  const location = useLocation()
  const productId = useParams().id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
  return <h1>{JSON.stringify(cartItems)}</h1>
}

export default CartScreen
