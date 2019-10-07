import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({courses}) => {
  console.log('course ', courses);
  return (
    courses.map(course => (
      <div key={course.id}>
        <Header name={course.name}/>
        <Content parts={course.parts} />
      </div>
    ))
    
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
      <Total parts={parts} />     
    </>
  )
}

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  
  return (
    <div>
      <Course courses={courses} />
      
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));


