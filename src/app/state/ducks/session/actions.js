import types from './types'

const authStateChange = (user) => ({
  type: types.AUTH_STATE_CHANGE,
  payload: {
    user
  }
})

const register = (email, password) => ({
  type: types.REGISTER,
  payload: {
    email, password
  }
})

const registerError = (error) => ({
  type: types.REGISTER_ERROR,
  error: true,
  payload: {
    error
  }
})

const clearRegistrationError = () => ({
  type: types.CLEAR_REGISTER_ERROR
})

const signOut = () => ({
  type: types.SIGN_OUT
})

const signIn = (email, password) => ({
  type: types.SIGN_IN,
  payload: {
    email, password
  }
})

const signInError = (error) => ({
  type: types.SIGN_IN_ERROR,
  error: true,
  payload: {
    error
  }
})

const clearSignInError = () => ({
  type: types.CLEAR_SIGN_IN_ERROR
})

export default {
  authStateChange,
  register,
  registerError,
  clearRegistrationError,
  signOut,
  signIn,
  signInError,
  clearSignInError
}
