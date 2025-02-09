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
      {props.contents.map((content, index) => (
        <Part key={index} content={content} />
      ))}
    </>
  )
    
  }
  const Total = ({contents}) => {
    const total = contents.reduce((sum, part) =>  sum + part.exercises, 0)
    
    
    return (
    <p>Number of exercises {total}</p>
    )
  }
  
  const Course = ({course}) => {  
    return (
      <>
        <Header course = {course.name}/>
        <Content contents= {course.parts}/>
        <Total contents= {course.parts}/>
      </>
    )
  
  }

  export default Course;