

const PersonsToShow = ({personsToShow, handleDelete}) => {
  return (
    <div>
        <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => <li key={person.id}>{person.name} {person.number} 
          <button onClick={() => handleDelete(person.id)} >delete</button>
        </li>)}
   </ul>
    </div>
  )
}

export default PersonsToShow