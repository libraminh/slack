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