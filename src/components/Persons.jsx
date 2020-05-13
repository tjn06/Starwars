import React, { useState, useEffect } from 'react';
import '../App.css';

const Persons = ({personWithPlanet, isLoading, onChildClick, favouritesPar}) => {
//--------------------------------Search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = event => {
  setSearchTerm(event.target.value);
  };
  //--------------------------------FavouriteList
  const [favourites, setFavourites] = useState([])
  const [alreadyAdded, setAlreadyAdded] = useState([]) //Message already added person

  const [added, setAdded] = useState(['SEARCH OR ADD PLANETS TO FAVOURITELIST']) //Message added person
  const [borderAdded, setBorderAdded] = useState()
  const [borderAddedFirst, setBorderAddedFirst] = useState()
   //--------------------------------Search
// console.log(favouritesPar)

useEffect(() => {
  setFavourites(favouritesPar);
  }, [favouritesPar]);

useEffect(() => {
  if (personWithPlanet.length > 1 ) {
  const results = personWithPlanet.filter(person =>
      person.name.toLowerCase().includes(searchTerm)
  );
  setSearchResults(results);
  }
  }, [searchTerm,personWithPlanet]);

//-----------------------------------Favourites
// function deleteFavourite (persDel) {
//   setFavourites(favourites.filter(x => x !== persDel));
// }

function handleAddFavorite (pers, index) {
  let personIncluded = favourites.some(arrVal => pers === arrVal);
  if (!personIncluded) {
  let newPersArr = []
  newPersArr = [...favourites, (pers)];
  // setFavourites(newPersArr)
  onChildClick(newPersArr)
  setAlreadyAdded('')
  setAdded(pers.name + ' ADDED TO FAVOURITELIST')
  setBorderAddedFirst(index)
  } else {
    setAlreadyAdded(pers.name + ' ALREADY ADDED TO FAVOURITELIST')
    setBorderAdded(index)
    setAdded('')
  }
}
//-----------------------------------
const alreadyAddedMess = (
      <span>{alreadyAdded}</span> 
)

const addedMess = (
  <span>{added}</span> 
)



function cssClassFunc (index) {
if(index === borderAdded) {
  let cssFirst = 'addedSelected';
  return cssFirst;
} else if (index === borderAddedFirst){
  let cssSecond = 'item-first-click';
  return cssSecond
} else {
  let cssDefault = 'persons-item';
  return cssDefault
}
}

const personList = searchResults.map((person,index) => (
  <div className={cssClassFunc(index)} key={person.name}>
      <span className="name-color-size">{person.name}</span>
      Homeworld: {person.homeworld}<br></br>
      Birth date: {person.birth_year}<br></br>
      {/* <button onClick={() => setFavourites(favourites.concat(person))}>-1</button> */}
      <div>
      <button onClick={() => handleAddFavorite(person, index)}>Add to favourites</button>
      </div>
  </div>
))

//  const favouriteList = favourites.map((person,index) => (
//   <div key={index}>
//       name={person.name}
//       homeworld={person.homeworld}
//       birth date={person.birth_year}
//       {person.added_by}
//       <button onClick={() => deleteFavourite(person)}>-1</button>
//   </div>
// ))

  return (
    <div className="App">
    <h3 >PERSONS</h3>
    <div className="empty-space"><span className="already-added-mess">{alreadyAddedMess}</span><span className="added-mess">{addedMess}</span></div>
    {/* {favouriteList} */}
    <input type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleChange}
    />

    {isLoading && <p>Wait I'm Loading comments for you</p>}
    <div className="persons">{personList}</div>
  </div>
);
}


export default Persons;