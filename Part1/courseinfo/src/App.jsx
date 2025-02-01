const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = ({content}) => {
  return (
    <>
    <p> {content.name} {content.exercises}</p>
    </>
  )
}

const Content = (props) => {
return (
  <>
    {props.content.map((content, index) => (
      <Part key={index} content={content} />
    ))}
  </>
)
  
}
const Total = (props) => {
  const total =props.content[0].exercises + props.content[1].exercises + props.content[2].exercises
  return (
  <p>Number of exercises {total}</p>
  )
}

const App = () => {
    const course = {
    name: 'Half Stack application development',
    parts : [{name:'Fundamentals of React', exercises: 10 },{name:'Using props to pass data', exercises: 17 }, {name:'State of a component', exercises: 14 }]
}
    return (
      <div>
        <Header course = {course.name}/>
        <Content content= {course.parts}/>
        <Total content= {course.parts}/>
      </div>
    )
  }

export default App
