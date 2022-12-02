import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_NEAR_REQUEST,
  PRODUCT_LIST_NEAR_SUCCESS,
  PRODUCT_LIST_NEAR_FAIL,
} from '../constants/productReducer'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        products: [],
        loading: true,
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      }
    case PRODUCT_LIST_FAIL:
      return {
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export const productListNearReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_NEAR_REQUEST:
      return {
        products: [],
        loading: true,
      }
    case PRODUCT_LIST_NEAR_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      }
    case PRODUCT_LIST_NEAR_FAIL:
      return {
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
