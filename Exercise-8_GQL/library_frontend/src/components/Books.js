import { useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS_WITH_GENRE } from '../queries'

const Books = ({ books }) => {
  const [selectedGenre, setselectedGenre] = useState('all')
  const [filteredBooks, setfilteredBooks] = useState([])

  const [getFilteredBooks, result] = useLazyQuery(ALL_BOOKS_WITH_GENRE)

  useEffect(() => {
    if (result.data) {
      setfilteredBooks(result.data.allBooks)
    }
  }, [setfilteredBooks, result])

  useEffect(() => {
    if (selectedGenre === 'all') {
      setfilteredBooks(books)
    } else {
      getFilteredBooks({
        variables: { genre: selectedGenre },
      })
    }
  }, [getFilteredBooks, selectedGenre, books])

  const filter = (genre) => {
    setselectedGenre(genre)
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        <button onClick={(b) => filter(b.target.textContent)}>
          refactoring
        </button>
        <button onClick={(b) => filter(b.target.textContent)}>agile</button>
        <button onClick={(b) => filter(b.target.textContent)}>patterns</button>
        <button onClick={(b) => filter(b.target.textContent)}>design</button>
        <button onClick={(b) => filter(b.target.textContent)}>crime</button>
        <button onClick={(b) => filter(b.target.textContent)}>classic</button>
        <button onClick={(b) => filter(b.target.textContent)}>all</button>
      </div>
      in genre <b>{selectedGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
