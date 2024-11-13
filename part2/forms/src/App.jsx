import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const DisplayNumbers = ({list}) => {
  return (
    <>
     {list.map(onePerson => <p key={onePerson.id}>{onePerson.name} {onePerson.number}</p>)}
     </>
  )
}

const Filter = ({onChange}) => {
  return(
    <div>
          <label>filter shown with</label> 
          <input onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({HandleNameChange, HandleNumberChange, FormSubmit}) => {
  return (
      <form>
        <div>
          name: <input onChange={HandleNameChange}/>
        </div>
        <div>number: <input onChange={HandleNumberChange} /></div>
        <div>
          <button type="submit" onClick={FormSubmit}>add</button>
        </div>
      </form>
  )
}

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [personSearchResults, setResults] = useState([])

  const HandleNameChange = (e) => {
      //console.log('new name handler ' + e.target.value);
      setNewName(e.target.value.trim())
  }
  const HandleNumberChange = (e) => {
    //console.log('new number handler ' + e.target.value);
    setNewNumber(e.target.value.trim())
 }
 const findNames = (e) => {
  const findString = e.target.value.trim().toLowerCase()
  const result = persons.filter((one) => one.name.trim().toLowerCase().includes(findString));
  console.log(result)
  setResults(result)
 } 

  const FormSubmit = (ev) => {
      ev.preventDefault()
      const found = persons.findIndex(e => e.name.trim().toLowerCase() === newName.toLowerCase())
      //console.log(found)
      if (found === -1)
      {
        const phoneBook = persons.concat({name: newName, number: newNumber, id: persons.length})
        setPersons(phoneBook)
      }
      else
        alert (newName + " is akready added ti phonebook")
      //console.log(phoneBook)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={findNames}></Filter>
      <PersonForm HandleNameChange={HandleNameChange} HandleNumberChange={HandleNumberChange} FormSubmit={FormSubmit}></PersonForm>
      <h2>Numbers</h2>
      <DisplayNumbers list={persons}></DisplayNumbers>
      <h2>Search Results</h2>
      <DisplayNumbers list={personSearchResults}></DisplayNumbers>
    </div>
  )
}

export default App
