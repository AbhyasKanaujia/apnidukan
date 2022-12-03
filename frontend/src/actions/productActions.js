import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_NEARBY_REQUEST,
  PRODUCT_LIST_NEARBY_SUCCESS,
  PRODUCT_LIST_NEARBY_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  SELLER_DETAILS_REQUEST,
  SELLER_DETAILS_SUCCESS,
  SELLER_DETAILS_FAIL,
  PRODUCT_LIST_MY_REQUEST,
  PRODUCT_LIST_MY_FAIL,
  PRODUCT_LIST_MY_SUCCESS,
} from '../constants/productConstants'
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/products')

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listNearbyProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_NEARBY_REQUEST })

    const { data } = await axios.get('/api/products/nearby')

    dispatch({ type: PRODUCT_LIST_NEARBY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_NEARBY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getSellerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}/seller`)

    dispatch({ type: SELLER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SELLER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getMyProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_MY_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/products/my`, config)

    dispatch({ type: PRODUCT_LIST_MY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
