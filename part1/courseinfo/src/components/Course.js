import React from 'react'


const Course = ({courses}) => {
  return (
    courses.map(course => (
      <div key={course.id}>
        <Header name={course.name}/>
        <Content parts={course.parts} />
      </div>
    ))    
  )
}

const Header = ({name}) => ( <h1>{name}</h1> )


const Content = ({parts}) => (
    <>
      <Part parts={parts} />
      <Total parts={parts} />     
    </>
  )


const Part = ({parts}) => {
  
  return (
  
    parts.map(part => 
      <p key={part.id}> 
        {part.name} {part.exercises}
      </p>
    )
  )
}

const Total = ({parts}) => {
  const exercisesTotal = parts.reduce((total, part) => total + part.exercises,0)
  
  return (
    <b>Total of { exercisesTotal } exercises </b>
  )
}

export default Course