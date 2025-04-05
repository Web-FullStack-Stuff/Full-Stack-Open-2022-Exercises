import { useQuery, useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { ME, ALL_BOOKS_WITH_GENRE } from '../queries'

const Recommend = () => {
  var user = useQuery(ME)
  const [getFavoriteBooks, result] = useLazyQuery(ALL_BOOKS_WITH_GENRE)
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    if(result.data) {
      setFavoriteBooks(result.data.allBooks)
    }
  }, [setFavoriteBooks, result])

  useEffect(() => {
    if(user.data) {
      getFavoriteBooks({
        variables: { genre: user.data.me.favoriteGenre }
      })
    }
  }, [getFavoriteBooks, user])

  if(!user.data) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favourite genre <b>{user.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks.map((a) => (
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

export default Recommend
