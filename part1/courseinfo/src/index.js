import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({course}) => {
  console.log('course ', course);
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts} />
    </>
  )
  
}

const Header = ({name}) => {
  console.log('header ', name);
  return ( <h1>{name}</h1> )
}


const Content = ({parts}) => {
  console.log("Content parts: ",parts)
  return (
    <>
      <Part parts={parts} />
          
    </>
  )
}

const Part = ({parts}) => {
  console.log("Part props: ", parts);
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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }

    ]
  }
  
  
  return (
    <div>
      <Course course={course} />
      <Total parts={course.parts} /> 
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));


