import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notes'

const Note = ({ note, handleClick }) => {
  return (
    <li key={note.id} onClick={handleClick(note)}>
      {note.content}
      <strong>{note.important ? ' important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.notes
    }
    return state.filter === 'IMPORTANT'
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
  })

  const changeImportance = (note) => async () => {
    const changedNote = { ...note, important: !note.important }
    await noteService.update(note.id, changedNote)
    dispatch(toggleImportanceOf(note.id))
  }

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={changeImportance}
        />
      )}
    </ul>
  )
}

export default Notes