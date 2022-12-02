import {
  USER_LOCATION_FAIL,
  USER_LOCATION_REQUEST,
  USER_LOCATION_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      }
    case USER_LOGIN_SUCCESS:
      return {
        userInfo: action.payload,
        loading: false,
      }
    case USER_LOGIN_FAIL:
      return {
        error: action.payload,
        loading: false,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      }
    case USER_REGISTER_SUCCESS:
      return {
        userInfo: action.payload,
        loading: false,
      }
    case USER_REGISTER_FAIL:
      return {
        error: action.payload,
        loading: false,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userLocationReducer = (state = { coordinates: [] }, action) => {
  switch (action.type) {
    case USER_LOCATION_REQUEST:
      return {
        loading: true,
      }
    case USER_LOCATION_SUCCESS:
      return {
        coordinates: action.payload,
        loading: false,
      }
    case USER_LOCATION_FAIL:
      return {
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
