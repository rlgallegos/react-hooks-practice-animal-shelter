import React from "react";
import Pet from "./Pet";

function PetBrowser({onAdoptPet, pets}) {
const petElements = pets.map(pet => {
  return <Pet onAdoptPet={onAdoptPet} key={pet.id} pet={pet} />
})



  return <div className="ui cards">{petElements}</div>;
}

export default PetBrowser;
