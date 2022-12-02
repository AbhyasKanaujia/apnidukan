import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOCATION_REQUEST,
  USER_LOCATION_SUCCESS,
  USER_LOCATION_FAIL,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    localStorage.setItem('userInfo', JSON.stringify(data))

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

export const register =
  (name, phone, email, address, latitude, longitude, password) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users/',
        {
          name,
          phone,
          email,
          address,
          location: { type: 'Point', coordinates: [latitude, longitude] },
          password,
        },
        config
      )

      localStorage.setItem('userInfo', JSON.stringify(data))

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getUserLocation = () => (dispatch) => {
  dispatch({ type: USER_LOCATION_REQUEST })

  if (!navigator.geolocation) {
    dispatch({
      type: USER_LOCATION_FAIL,
      payload: 'Geolocation is not supported by your browser',
    })
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: USER_LOCATION_SUCCESS,
          payload: [position.coords.latitude, position.coords.longitude],
        })
      },
      (e) => {
        dispatch({ type: USER_LOCATION_FAIL, payload: e.message })
      }
    )
  }
}
