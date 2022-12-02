import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_NEAR_REQUEST,
  PRODUCT_LIST_NEAR_SUCCESS,
  PRODUCT_LIST_NEAR_FAIL,
} from '../constants/productReducer'
import axios from 'axios'

export const listProducts = async (dispatch) => {
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

export const listNearProducts = async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_NEAR_REQUEST })

    const { data } = await axios.get('/api/products/nearby')

    dispatch({ type: PRODUCT_LIST_NEAR_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_NEAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
