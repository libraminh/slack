import * as actionTypes from './types'

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    currentUser: user
  }
}

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  }
}

/* Channel Actions */
export const setCurrentChannel = channel => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    currentChannel: channel
  }
}

export const setPrivateChannel = isPrivateChannel => {
  return { 
    type: actionTypes.SET_PRIVATE_CHANNEL,
    isPrivateChannel
  }
}

export const setUserPosts = userPosts => {
  return {
    type: actionTypes.SET_USER_POSTS,
    userPosts
  }
}

// Colors Actions
export const setColors = (primaryColor, secondaryColor) => {
  return {
    type: actionTypes.SET_COLORS,
    primaryColor,
    secondaryColor
  }
}