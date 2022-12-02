import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_NEARBY_REQUEST,
  PRODUCT_LIST_NEARBY_SUCCESS,
  PRODUCT_LIST_NEARBY_FAIL,
} from '../constants/productReducer'
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
