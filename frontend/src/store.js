import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  productListReducer,
  productListNearbyReducer,
  productDetailsReducer,
  sellerDetailsReducer,
} from './reducers/productReducers'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productListNearby: productListNearbyReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  sellerDetails: sellerDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = { userLogin: { userInfo: userInfoFromStorage } }

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
