import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVote(state, action){
      const id = action.payload
      const selectedContent = state.find(n => n.id === id)
      const updatedVote = {
        ...selectedContent,
        votes: selectedContent.votes + 1
      }
      return state.map(n =>
        n.id !== id ? n : updatedVote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { increaseVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote =await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

// export const updateVote = id => {
//   return async dispatch => {
//     const updatedAnecdote = await 
//   }
// } 

export default anecdoteSlice.reducer