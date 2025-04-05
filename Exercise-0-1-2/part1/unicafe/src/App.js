
import { useState } from 'react';


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  return (
    <div className="App">
      <Feedback handleBadClick={handleBadClick} handleGoodClick={handleGoodClick} handleNeutralClick={handleNeutralClick} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

const Header = ({ title }) => <h1>{title}</h1>
const Button = ({ handleClick, text }) => <><button onClick={handleClick}>{text}</button>&nbsp;&nbsp;</>
const StatisticLine = ({ text, value,suffix }) => (<tr><td>{text}</td><td>{value} {suffix}</td></tr>)

const Feedback = ({ handleBadClick, handleGoodClick, handleNeutralClick }) => {
  return (
    <>
      <Header title={'Give feedbacks'} />
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />
    </>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  let total = good + neutral + bad
  if (total > 0) {
    return (
      <>
        <Header title={'Statistics'} />
        <table>
          <tbody>
            <StatisticLine text={'Good'} value={good} />
            <StatisticLine text={'Neutral'} value={neutral} />
            <StatisticLine text={'Bad'} value={bad} />
            <StatisticLine text={'All'} value={total} />
            <StatisticLine text={'Average'} value={(1 * good + 0 * neutral + (-1 * bad)) / total} />
            <StatisticLine text={'Positive'} value={good / total * 100} suffix={'%'}/>
          </tbody>
        </table>
      </>
    )
  }
  return (
    <>
      <Header title={'Statistics'} />
      <p>No feedback given</p>
    </>
  )
}
export default App;
