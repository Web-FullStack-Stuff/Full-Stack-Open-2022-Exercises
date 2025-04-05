import { useState } from "react";

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  let totalAnecdotes = anecdotes.length
  const [popularAnecdote, setPopularAnecdote] = useState(0)
  let maxPoint = 0
  
  const [points, setPoints] = useState(new Array(totalAnecdotes).fill(0))
  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    let x = Math.floor(Math.random() * totalAnecdotes);
    setSelected(x)
  }
  const handleVote = () => {
    let copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    maxPoint = Math.max(...copy)
    setPopularAnecdote(copy.indexOf(maxPoint))
  }

  return (
    <div className="App">
      <Header text={'Anecdote of the day'}/>
      <Anecdote anecdote={anecdotes[selected]} point={points[selected]}/>
      <Button handleClick={handleVote} text={'Vote'} />
      <Button handleClick={nextAnecdote} text={'Next anecdote'} />
      
      <Header text={'Anecdote with most votes'}/>
      <Anecdote anecdote={anecdotes[popularAnecdote]} point={points[popularAnecdote]}/>
    </div>
  );
}

const Header = ({text}) => <h1>{text}</h1>
const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const Anecdote = ({anecdote, point}) => (<><h3>{anecdote}</h3><h4>has {point} votes</h4></>)

export default App;
