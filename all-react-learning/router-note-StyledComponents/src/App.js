import { useState } from 'react'
import {
  Routes, Route, Link, Navigate, useMatch, useNavigate
} from 'react-router-dom'

import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`
const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`
const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
      <table>
        <body>
          {notes.map(note =>
            <tr key={note.id}>
              <td>
                <Link to={`/notes/${note.id}`}>
                  {note.content}
                </Link>
              </td>
              <td>
                {note.user}
              </td>
            </tr>
          )}
        </body>
      </table>
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('keshab')
    navigate('/')
  }

  const padding = {
    padding: 10
  }
  return (
    <div>
      <h2>login</h2>

      <form onSubmit={onSubmit}>
        <div style={padding}>
          username:
          <Input />
        </div>
        <div style={padding}>
          password:
          <Input type='password' />
        </div>
        <Button type='submit' primary=''>
          login
        </Button>
      </form >
    </div >
  )
}

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Keshab</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const App = () => {

  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  const styleLink = {
    paddingLeft: 20,
    textDecoration: 'none'
  }

  return (
    <Page>
      {/* {(message &&
        <Alert severity='success'>
          {message}
        </Alert>
      )} */}

      <Navigation>
        <Link style={styleLink} to="/">home</Link>
        <Link style={styleLink} to="/notes">notes</Link>
        <Link style={styleLink} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={styleLink} to="/login">
            login
          </Link>
        }
      </Navigation>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer>
        <em>Note app, Department of Computer Science 2023</em>
      </Footer>
    </Page>
  );
}

export default App;
