import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action){
      return action.payload
    },
    clearNotification(state, action){
      return ''
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content, timeOut) => {
  return async dispatch => {
    dispatch(showNotification(content))
    setTimeout(() => dispatch(clearNotification()), timeOut)
  }
}
export default notificationSlice.reducer