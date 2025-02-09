import { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonsToShow from './components/PersonsToShow'
import Form from './components/Form'
import phonebookService from './services/phonebookService'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => { 
phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  

  const handleAddDetails = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    const numberExists = persons.some(person => person.number === newNumber)
    if (nameExists && numberExists) {
     alert(`${newName} is already added to phonebook`)
      return
    }
    if (nameExists && !numberExists) {
      handleUpdateDetails(event)
      return
    }


    if (newName === '' || newNumber === '') {
      alert('Please enter a name and number')
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      
    }
    console.log(newPerson)

    phonebookService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${returnedPerson.name}`) 
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
   
    setNewName('')
    setNewNumber('')
  }

  const handleUpdateDetails = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    if (confirm) {
      const updatedPerson = { ...person, number: newNumber }
      console.log(updatedPerson)
      phonebookService
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setMessage(`Updated ${returnedPerson.name} with number ${returnedPerson.number}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }
  



  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    const confirm = window.confirm(`Delete ${person.name}?`)
    if (confirm) {
      phonebookService
        .deletePerson(id)
        .then(() => {
setMessage(`Deleted ${person.name}`)
            setPersons(persons.filter(person => person.id !== id))
            
            
            setTimeout(() => {
              setMessage(null)
            }, 5000)

        }).catch(() => {
          // alert(`the person '${person.name}' was already deleted from server`)
          setMessage(`Information of ${person.name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          
        })
      }}


  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }
const personsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter placeholder="filter" value={newFilter} onChange={handleChangeFilter} />
      
      
      
      <Form 
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleAddDetails={handleAddDetails}
        // handleUpdateDetails={handleUpdateDetails}
      />

      <PersonsToShow personsToShow={personsToShow}  handleDelete={handleDelete} />
    </div>
  )
}

export default App
