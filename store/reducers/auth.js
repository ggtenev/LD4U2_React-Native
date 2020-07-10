import { SIGN_IN, SIGN_UP, LOGOUT } from "../actions/auth"

const initState = {
  token: null,
  userId: null
}

// Handling authentication actions
export default (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        token: action.token,
        userId: action.userId
      }
    case SIGN_UP:
      return {
        token: action.token,
        userId: action.userId
      }
    case LOGOUT:
      return initState
  }
  return state
}