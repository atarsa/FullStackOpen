import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Button Component
const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
    </button>
)
// Statistics Component
const Statistics = ({good, neutral, bad}) => (
  <>
    <h3>Statistics</h3>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
  </>
)


const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // helpers function
  const handleGoodFeedback = () => {
    return setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    return setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    return setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={handleGoodFeedback}  text='good' />
      <Button onClick={handleNeutralFeedback}  text='neutral'/>
      <Button onClick={handleBadFeedback} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
