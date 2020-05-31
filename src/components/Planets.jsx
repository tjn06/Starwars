import React, { useState, useEffect } from 'react';
import '../App.css';

const Planets = ({planetsAll, isLoadingPlanets, onChildClickPlanets, favouritesPlanetPar}) => {
//--------------------------------Search
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);
const handleChange = event => {
    setSearchTerm(event.target.value);
};
  //--------------------------------FavouriteList
const [favourites, setFavourites] = useState([])
const [alreadyAdded, setAlreadyAdded] = useState([''])//Message already added person

const [addedPlanet, setAddedPlanet] = useState(['SEARCH OR ADD PERSONS TO FAVOURITELIST']) //Message added person
const [borderAdded, setBorderAdded] = useState()
const [borderAddedFirst, setBorderAddedFirst] = useState()
   //--------------------------------Search
console.log(favouritesPlanetPar)

useEffect(() => {
    setFavourites(favouritesPlanetPar);
}, [favouritesPlanetPar]);

useEffect(() => {
    if (planetsAll.length > 1 ) {
    const results = planetsAll.filter(planet =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    ||planet.climate.toLowerCase().includes(searchTerm.toLowerCase())
    ||planet.terrain.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    }
}, [searchTerm,planetsAll]);

//-----------------------------------Favourites
// function deleteFavourite (planettDel) {
//     setFavourites(favourites.filter(x => x !== planettDel));
// }

function handleAddFavorite (plan, index) {
    let planetIncluded = favourites.some(arrVal => plan === arrVal);
    if (!planetIncluded) {
        let newPlanetArr = []
        newPlanetArr = [...favourites, plan];
        // setFavourites(newPersArr)
        onChildClickPlanets(newPlanetArr)
        setAlreadyAdded('')
        setAddedPlanet(plan.name + ' ADDED TO FAVOURITELIST')
        setBorderAddedFirst(index)
        } else {
            setAlreadyAdded(plan.name + ' ALREADY ADDED TO FAVOURITELIST')
            setBorderAdded(index)
            setAddedPlanet('')
        }
}
//-----------------------------------
const alreadyAddedMess = (
    <span>{alreadyAdded}</span> 
)

const addedPlanetMess = (
    <span>{addedPlanet}</span> 
)

function cssClassFunc (index) {
    if(index === borderAdded) {
      let cssFirst = 'addedSelected';
      return cssFirst;
    } else if (index === borderAddedFirst){
      let cssSecond = 'item-first-click';
      return cssSecond
    } else {
      let cssDefault = 'planets-item';
      return cssDefault
    }
    }

const planetsList = searchResults.map((planet,index) => (
<div className={cssClassFunc(index)} key={planet.name}>
    <span className="name-color-size">{planet.name}</span>
    Climate: {planet.climate}<br></br>
    Terrain: {planet.terrain}<br></br>
      {/* <button onClick={() => setFavourites(favourites.concat(person))}>-1</button> */}
    <div>
    <button onClick={() => handleAddFavorite(planet,index)}>Add to favourites</button>
    </div>
</div>
))

// const favouriteList = favourites.map((planet,index) => (
// <div key={index}>
//     Name={planet.name}
//     Climate={planet.climate}
//     Terrain={planet.terrain}
//     {planet.added_by}
//     <button onClick={() => deleteFavourite(planet)}>-1</button>
// </div>
// ))

return (
    <div className="App">
    <h3>PLANETS</h3>
    <div className="empty-space"><span className="already-added-mess">{alreadyAddedMess}</span><span className="added-mess">{addedPlanetMess}</span></div>
    {/* {favouriteList} */}
    
    <input type="text"
    placeholder="Search"
    value={searchTerm}
    onChange={handleChange}
    />
    

    {isLoadingPlanets && <p>Wait I'm Loading comments for you</p>}
    
    <div className="planets">{planetsList}</div>
</div>
);
}


export default Planets;