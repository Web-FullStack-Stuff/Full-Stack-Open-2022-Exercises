import { useState } from 'react'
import {
  Routes, Route, Link, Navigate, useMatch, useNavigate
} from 'react-router-dom'

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  Alert,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material'

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>

    <TableContainer component={Paper}>
      <Table striped>
        <TableBody>
          {notes.map(note =>
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>
                  {note.content}
                </Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
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
          <TextField label='username' />
        </div>
        <div style={padding}>
          <TextField label="password" type='password' />
        </div>
        <div style={padding}>
          <Button variant='contained' color="primary" type='submit'>
            login
          </Button>
        </div>
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
    <Container>
      {(message &&
        <Alert severity='success'>
          {message}
        </Alert>
      )}
      <div>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge="start" color='inherit' aria-label='menu'></IconButton>
            <Button color="inherit">
              <Button color='inherit' component={Link} to="/">home</Button>
            </Button>
            <Button color="inherit">
              <Button color='inherit' component={Link} to="/notes">notes</Button>
            </Button>
            <Button color="inherit">
              <Button color='inherit' component={Link} to="/users">users</Button>
            </Button>
            {user
              ? <em>{user} logged in</em>
              : <Button color='inherit' component={Link} to="/login">
                login
              </Button>
            }
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/notes/:id" element={<Note note={note} />} />
          <Route path="/notes" element={<Notes notes={notes} />} />
          <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <div>
        <i>Note app, Department of Computer Science 2023</i>
      </div>
    </Container>
  );
}

export default App;
