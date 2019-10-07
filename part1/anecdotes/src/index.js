import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// button component
const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

// anecdote component
const Anecdote = ({anecdotes, selected, points}) => {

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>has votes: {points[selected]}</div>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, {length: anecdotes.length}).map(function() {return 0;}))

  const handleNextAnecdote = () =>{
    setSelected(generateRandomNumber())
  }

  const handleVote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
    
  }

  // find index of most voted anecdote and pass is to second Anecdote componet
  const indexOfMostPopular = () => {
    let max = points[0]
    let maxIndex = 0

    for (let i=0; i < points.length; i++) {
      if (points[i] > max){
        max = points[i]
        maxIndex = i
      }
    }
    
    return maxIndex
  }
  

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdotes={anecdotes}
        selected={selected}
        points={points} />
     
      <div>
        <Button onClick={handleNextAnecdote} text="next anecdote"/>
        <Button onClick={handleVote} text="vote"/>
      </div>

      <h2>Anecdote with most votes</h2>
      <Anecdote anecdotes={anecdotes}
        selected={indexOfMostPopular()}
        points={points} />
      
      
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

function generateRandomNumber() {
  const max = anecdotes.length

  return Math.floor(Math.random() * Math.floor(max));
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)