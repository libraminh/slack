import * as actionTypes from '../actions/types'
import { combineReducers } from 'redux'

/* User Reducer */
const initialUserState = {
  currentUser: null,
  isLoading: true,
}

const user_reducer = (state = initialUserState, action) => {
  const { currentUser } = action
  
  switch(action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser,
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
  currentChannel: null,
  isPrivateChannel: false,
  userPosts: null
}

const channel_reducer = (state = initialChannel, action) => {
  const { userPosts, currentChannel, isPrivateChannel } = action

  switch(action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel
      }
    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel
      }
    case actionTypes.SET_USER_POSTS:
      return {
        ...state,
        userPosts: userPosts
      }
    default:
      return state
  }
}

const initialColorsState = {
  primaryColor: '#4c3c4c',
  secondaryColor: '#eee'
}

const colors_reducer = (state = initialColorsState, action) => {
  const { primaryColor, secondaryColor } = action

  switch (action.type) {
    case actionTypes.SET_COLORS:
      return {
        primaryColor,
        secondaryColor
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer,
  colors: colors_reducer
})

export default rootReducer