import * as actionTypes from '../actions/types'
import { combineReducers } from 'redux'


/* User Reducer */
const initialUserState = {
  currentUser: null,
  isLoading: true
}

const user_reducer = (state = initialUserState, action) => {
  switch(action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.currentUser,
        isLoading: false
      }
    case actionTypes.CLEAR_USER:
      return {
        ...initialUserState,
        isLoading: false
      }
    default:
      return state
  }
}

/* Channel Reducer */
const initialChannel = {
  currentChannel: null
}

const channel_reducer = (state = initialChannel, action) => {
  switch(action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.currentChannel
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
})

export default rootReducer