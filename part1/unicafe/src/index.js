import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Button Component
const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
    </button>
)

// Statistics Component
const Statistics = ({good, neutral, bad} ) => {
  const all = good + neutral + bad
  
  if (all === 0){
    return <p>No feedback given</p>
  }
  const average = ((good * 1 - bad * 1) / all).toFixed(2);
  
  
  const positive = (good / all * 100).toFixed(2) ;
  

  return(
  <table>
    <tbody>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive + "%"} />
    </tbody>
  </table>
  )
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  // <p>{text}: {value} </p>
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
      <h3>Statistics</h3>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
