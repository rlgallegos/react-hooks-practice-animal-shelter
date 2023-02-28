import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const [findPets, setFindPets] = useState(false)
  const [OQP, setOQP] =useState('/pets')

  //callback functions to Filter
  function handleChangeType(filterTerm) {
    setFilters({...filters, type: filterTerm})

    switch (filterTerm) {
      case 'all':
        setOQP('/pets')
        break;
      case 'cat':
        setOQP('/pets?type=cat')
        break;
      case 'dog':
        setOQP('/pets?type=dog')
        break;
      case 'micropig':
        setOQP('/pets?type=micropig')
        break;
      default:
        setOQP('')
    }
  }
  function handleFindPetsClick() {
    setFindPets(true)
  }

  //conditional useEffect
  useEffect(() => {
    if (findPets) {
      fetch(`http://localhost:3001${OQP}`)
      .then(res => res.json())
      .then(data => {
        setPets(data)
      })
    }
  }, [findPets, OQP])

  function handleAdoptPet(id) {
    const newArray = pets.map(pet => {
      if (pet.id === id) {
        pet.isAdopted = true;
        return pet
      } else {
        return pet
      }
    })
    setPets(newArray)
  }  

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onFindPetsClick={handleFindPetsClick} onChangeType={handleChangeType} />
          </div>
          <div className="twelve wide column">
            <PetBrowser onAdoptPet={handleAdoptPet} pets={pets} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
