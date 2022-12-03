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
  PRODUCT_LIST_MY_SUCCESS,
  PRODUCT_LIST_MY_FAIL,
} from '../constants/productConstants'

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

export const productListNearbyReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_NEARBY_REQUEST:
      return {
        products: [],
        loading: true,
      }
    case PRODUCT_LIST_NEARBY_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      }
    case PRODUCT_LIST_NEARBY_FAIL:
      return {
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      }
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const sellerDetailsReducer = (
  state = {
    seller: {
      phone: '',
      email: '',
      location: { type: 'Point', coordinates: [0, 0] },
    },
  },
  action
) => {
  switch (action.type) {
    case SELLER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SELLER_DETAILS_SUCCESS:
      return {
        loading: false,
        seller: action.payload,
      }
    case SELLER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const productListMyReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PRODUCT_LIST_MY_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case PRODUCT_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
