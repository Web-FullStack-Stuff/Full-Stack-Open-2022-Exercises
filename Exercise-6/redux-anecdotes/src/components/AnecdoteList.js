import { useSelector, useDispatch } from 'react-redux'

import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'


const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if(!state.filter) {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  
  const vote = (anecdote) => async () => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.update(anecdote.id, updatedAnecdote)
    dispatch(increaseVote(anecdote.id))

    dispatch(setNotification(`you voted "${anecdote.content}"`, 5000))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={vote}
        />  
      )}
    </div>
  )
}

export default AnecdoteList