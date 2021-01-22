import React, { useState } from 'react'
import './App.css';

const Names = ({names, nameState}) => {
  if (nameState === 'alpha') {
    names = names.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (nameState === 'order') {
    names = names.sort(function(a, b){
      if(a.amount > b.amount) { return -1; }
      if(a.amount < b.amount) { return 1; }
      return 0;
  });
  }
  return (
    <ul>
        {names.map(person => <li key={person.name}>{person.name}: {person.amount}</li>)}
    </ul>
  )
}

const Name = ({names, name}) => {
  const person = names.filter(p => p.name === name)[0]
  if (person) {
    return (
      <p>
        There are {person.amount} people with the name {person.name} @Solita.
      </p>
    )
  }
  return (
    <div></div>
  )
}


const App = ({names}) => {
  const [ nameFilter, setNameFilter ] = useState('')
  const [ person, setPersonFilter ] = useState('')

  const handleOrder = () => {
    console.log('clicked order')
    setNameFilter('order')
  }
  const handleAlpha = () => {
    console.log('clicked alpha')
    setNameFilter('alpha')
  }

  const handleChange = (event) => {
    setPersonFilter(event.target.value);
  }

  var total = 0
  names.forEach(n => total += n.amount) // count the total of all amounts

  return (
    <div className="App">
      <h2>Names @ Solita</h2>
      <Names names={names} nameState={nameFilter}/>
      <p>
        The total of all the names is {total}.
      </p>
  
      <label htmlFor="order-select">Choose an order:</label>
      <p>
        <button onClick={handleAlpha} className="button">Alphabetical order</button>
      </p>
      <p>
        <button onClick={handleOrder} className="button">Order the names!</button>
      </p>

      <label htmlFor="name-select">Choose a name:</label>
      <select name="name-select" onChange={handleChange}>
        {names.map(person => <option name="name_key" key={person.name} value={person.name}>{person.name}</option>)}
      </select>
      <Name name={person} names={names}/>

    </div>
  );
}

export default App;
