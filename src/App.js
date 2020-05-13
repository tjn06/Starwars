import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Welcome from './components/Welcome';
import Persons from './components/Persons';
import Planets from './components/Planets';
import Logo from './logo.svg';

function App() {

  const [lengthPersons, setLengthPersons] = useState(0);
  const [lengthPlanets, setLenghtPlanets] = useState(0);
  //--------------------------------Data from api calls
  const [personAll, setPersonAll] = useState([]);
  const [planetsAll, setPlanetsAll] = useState([]);
  //--------------------------------Homeworldname to persondata
  const [personWithPlanet, setPersonWithPlanet] = useState([]);
  //--------------------------------Loadingmessage
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPlanets, setIsLoadingPlanets] = useState(true);
  // const [personsFromChild, setPersonsFromChild] = useState({name: 'hej'});
  //----------------------------------------From child functions
  function handleChildClick(newPersArr) {
    setFavourites(newPersArr)
  }
  function handlePlanetsChildClick(newPlanetArr) {
    setFavouritesPlanets(newPlanetArr)
  }
  
  //----------------------------------------SetScreen
  const WELCOME = 'welcome', PERSONS = 'Persons', PLANETS = 'Planets', FAVORITES = 'Favourites',
  ADDSHOWPERSONS = 'Addshowpersons', ADDSHOWPLANETS = 'Addshowplanets';
  // questions: [{ questions, possible answears, which i scorrect }]
  const [currentScreen, setCurrentScreen] = useState(WELCOME);
  
  const welcomeScreen = () => { 
    setCurrentScreen(WELCOME)
  }
  const personsScreen = () => { 
    setCurrentScreen(PERSONS)
  }
  const planetsScreen = () => { 
    setCurrentScreen(PLANETS)
  }
  const favouritesScreen = () => { 
    setCurrentScreen(FAVORITES)
  }
  const addShowPersonScreen = () => {
    setCurrentScreen(ADDSHOWPERSONS)
  }
  const addShowPlanetsScreen = () => {
    setCurrentScreen(ADDSHOWPLANETS)
  }
  
//--------------------------------------------------------Persons
const [valueName, setValueName] = useState([]);
const [valueHomeworld, setValueHomeworld] = useState([]);
const [valueBirthyear, setValueBirthyear] = useState([]);
const [favourites, setFavourites] = useState([])

const [touchedBirthyear, setTouchedBirthyear] = useState(false);
const [touchedHomeWorld, setTouchedHomeWorld] = useState(false);
const [touchedName, setTouchedName] = useState(false);

//fav
const handleChangeFormName = event => {
  setValueName(event.target.value);
};
const handleChangeFormHomeworld = event => {
  setValueHomeworld(event.target.value);
};
const handleChangeFormBirthyear = event => {
  setValueBirthyear(event.target.value);
};

//------------------------------------------------------Planets
const [valuePlanetsName, setValuePlanetsName] = useState([]);
const [valuePlanetsClimate, setValuePlanetsClimate] = useState([]);
const [valuePlanetsTerrain, setValuePlanetsTerrain] = useState([]);
const [favouritesPlanets, setFavouritesPlanets] = useState([])

const [touchedPlanetsName, setTouchedPlanetsName] = useState(false);
const [touchedPlanetsClimate, setTouchedPlanetsClimate] = useState(false);
const [touchedPlanetsTerrain, setTouchedPlanetsTerrain] = useState(false);

const handleChangeFormPlanetsName = event => {
  setValuePlanetsName(event.target.value);
};
const handleChangeFormPlanetsClimate = event => {
  setValuePlanetsClimate(event.target.value);
};
const handleChangeFormPlanetsTerrain = event => {
  setValuePlanetsTerrain(event.target.value);
};

//----------------------------------Validation Planet
const isValidLength = l => {
  if  (l.length < 2 || l.length > 20) 
  return false;
  else 
  return true;
}

let cssClassPlanetsName = '';
if( touchedPlanetsName ) {
  if( isValidLength(valuePlanetsName) )
    cssClassPlanetsName = 'valid';
  else
    cssClassPlanetsName = 'invalid'
}

let cssClassPlanetsClimate = '';
if( touchedPlanetsClimate ) {
  if( isValidLength(valuePlanetsClimate) )
    cssClassPlanetsClimate = 'valid';
  else
    cssClassPlanetsClimate = 'invalid'
}

let cssClassPlanetsTerrain = '';
if( touchedPlanetsTerrain ) {
  if( isValidLength(valuePlanetsTerrain) )
    cssClassPlanetsTerrain = 'valid';
  else
    cssClassPlanetsTerrain = 'invalid'
}



let btnPlanetsDisable = true;
if( touchedPlanetsName) {
  if( isValidLength(valuePlanetsName) )
  btnPlanetsDisable = false;
  else
  btnPlanetsDisable = true;
}

if( touchedPlanetsClimate ) {
  if( isValidLength(valuePlanetsClimate) )
    btnPlanetsDisable = false;
  else
    btnPlanetsDisable = true;
}

if( touchedPlanetsTerrain ) {
  if( isValidLength(valuePlanetsTerrain) )
    btnPlanetsDisable = false;
  else
    btnPlanetsDisable = true;
}



let planetsNameValMess = '';
if( touchedPlanetsName ) {
  if( isValidLength(valuePlanetsName) )
  planetsNameValMess = ''
  else
  planetsNameValMess = 'Please add at least 3 characters and max 20'
}

let planetsClimateValMess = '';
if( touchedPlanetsClimate ) {
  if( isValidLength(valuePlanetsClimate) )
  planetsClimateValMess = ''
  else
  planetsClimateValMess = 'Please add at least 3 characters and max 20'
}

let planetsTerrainValMess = '';
if( touchedPlanetsTerrain ) {
  if( isValidLength(valuePlanetsTerrain) )
    planetsTerrainValMess = ''
  else
    planetsTerrainValMess = 'Please add at least 3 characters and max 20'
}
//----------------------------------Validation Person


let cssClassName = '';
if( touchedName ) {
  if( isValidLength(valueName) )
    cssClassName = 'valid';
  else
    cssClassName = 'invalid'
}

let cssClassHomeworld = '';
if( touchedHomeWorld ) {
  if( isValidLength(valueHomeworld) )
    cssClassHomeworld = 'valid';
  else
    cssClassHomeworld = 'invalid'
}

const isValidNumber = x => {
  let maybeNumber = Number(x);
  if (x.length < 1 || x.length > 3) 
  return false;
  return !isNaN(maybeNumber)

}
let cssClassBirthyear = '';
if( touchedBirthyear ) {
  if( isValidNumber(valueBirthyear) )
    cssClassBirthyear = 'valid';
  else
    cssClassBirthyear = 'invalid'
}



let btnName = true;
if( touchedName ) {
  if( isValidLength(valueName) )
  btnName = false;
  else
  btnName = true;
}

if( touchedHomeWorld ) {
  if( isValidLength(valueHomeworld) )
    btnName = false;
  else
    btnName = true;
}

if( touchedBirthyear ) {
  if( isValidNumber(valueBirthyear) )
    btnName = false;
  else
    btnName = true;
}



let nameValMess = '';
if( touchedName ) {
  if( isValidLength(valueName) )
  nameValMess = ''
  else
  nameValMess = 'Please add at least 3 characters and max 20'
}

let homeWorldValMess = '';
if( touchedHomeWorld ) {
  if( isValidLength(valueHomeworld) )
  homeWorldValMess = ''
  else
  homeWorldValMess = 'Please add at least 3 characters and max 20'
}

let birthyearValMess = '';
if( touchedBirthyear ) {
  if( isValidNumber(valueBirthyear) )
    birthyearValMess = ''
  else
    birthyearValMess = 'Please add(only numbers) atleast 1 digit and max 3'
}


  const handleSubmit = event => {
  if (valueName && valueHomeworld && valueBirthyear) {
    setFavourites(favourites.concat({
      name: valueName, 
      homeworld: valueHomeworld, 
      birth_year: valueBirthyear + 'BBY',
      added_by: 'Added by user'
    }));
  }

  setValueName('');
  setValueHomeworld('');
  setValueBirthyear('');
  setTouchedBirthyear(false)
  setTouchedHomeWorld(false);
  setTouchedName(false);

  event.preventDefault();
};
//favend

function deleteFavourite (persDel) {
  setFavourites(favourites.filter(x => x !== persDel));
}


  const handleSubmitPlanets = event => {
  if (valuePlanetsName && valuePlanetsClimate && valuePlanetsTerrain) {
      setFavouritesPlanets(favouritesPlanets.concat({
      name: valuePlanetsName, 
      climate: valuePlanetsClimate, 
      terrain: valuePlanetsTerrain,
      added_by: 'Added by user'
    }));
  }

  setValuePlanetsName('');
  setValuePlanetsClimate('');
  setValuePlanetsTerrain('');
  setTouchedPlanetsName(false);
  setTouchedPlanetsClimate(false);
  setTouchedPlanetsTerrain(false);

  event.preventDefault();
};
//favend

function deleteFavouritePlanets (planDel) {
  setFavouritesPlanets(favouritesPlanets.filter(x => x !== planDel));
}


//----------------------------Favourites
const favouritesSections = (
  <div>
  <button className="btn-menue" onClick={addShowPersonScreen}> Add/Show Favourite Person(s) </button>
  <button className="btn-menue" onClick={addShowPlanetsScreen}> Add/Show Favourite Planet(s) </button>
  <button className="btn-menue" onClick={favouritesScreen}> Show All Favourites </button>
  </div>
)

//-------------------------------------------------Planets Fav
const favouriteListPlanets = favouritesPlanets.map((planet,index) => (
  <div className="planets-item" key={index}>
      <span className="name-color-size">{planet.name}</span>
      Climate: {planet.climate} <br></br>
      Terrain: {planet.terrain} <br></br>
      {planet.added_by}
      <div>
      <button onClick={() => deleteFavouritePlanets(planet)}>Delete</button>
      </div>
  </div>
))

const favouriteListAndFormPlanets = (
  <div>
  {favouritesSections}
  <h3 >ADD PLANET</h3>
  <form className="flexRowShow" onSubmit={handleSubmitPlanets}>
  <span>{planetsNameValMess}</span>
  <input type="text" className={cssClassPlanetsName} value={valuePlanetsName} placeholder="Input Planet Name"
  onChange={handleChangeFormPlanetsName} onBlur={event => setTouchedPlanetsName(true)} />
  
  <span>{planetsClimateValMess}</span>
  <input type="text" className={cssClassPlanetsClimate} value={valuePlanetsClimate} placeholder="Input Climate"
  onChange={handleChangeFormPlanetsClimate} onBlur={event => setTouchedPlanetsClimate(true)} />
  
  <span>{planetsTerrainValMess}</span>
  <input type="text" className={cssClassPlanetsTerrain} value={valuePlanetsTerrain} placeholder="Input Terrain"
  onChange={handleChangeFormPlanetsTerrain} onBlur={event => setTouchedPlanetsTerrain(true)} />
  
  <button disabled={btnPlanetsDisable} type="submit">Add Planet</button>
  </form>
  <h3 className="line-over">FAVOURITELIST PLANETS</h3>
  <div className="planets">{favouriteListPlanets}</div>
  </div>
      )
//-------------------------------------------------Person Fav

const favouriteList = favourites.map((person,index) => (
  <div className="persons-item" key={index}>
      <span className="name-color-size">{person.name}</span>
      Homeworld: {person.homeworld}<br></br>
      Birh Date: {person.birth_year}<br></br>
      {person.added_by}
      <div>
      <button onClick={() => deleteFavourite(person)}>Delete</button>
      </div>
  </div>
))

const favouriteListAndForm = (
  <div>
    {favouritesSections}
    <h3>ADD PERSON</h3>
    <form className="flexRowShow" onSubmit={handleSubmit}>
    
    <span>{nameValMess}</span>
    <input type="text" className={cssClassName} value={valueName} placeholder="Input Name"
    onChange={handleChangeFormName} onBlur={event => setTouchedName(true)} />

    <span>{homeWorldValMess}</span>
    <input type="text" className={cssClassHomeworld} value={valueHomeworld} placeholder="Input Homeworld"
    onChange={handleChangeFormHomeworld} onBlur={event => setTouchedHomeWorld(true)} />

    <span>{birthyearValMess}</span>
    <input type="text" className={cssClassBirthyear} value={valueBirthyear} placeholder="Input Birthyear"
    onChange={handleChangeFormBirthyear} onBlur={event => setTouchedBirthyear(true)} />

    <button disabled={btnName} type="submit">ADD PERSON</button>
    </form>
    <h3 className="line-over">FAVOURITELIST PERSONS</h3>
    <div className="persons">{favouriteList}</div>
  </div>
)
//-------------------------------------------------Person Fav

const favouriteListPersonsPlanets = (
  <div>
  {favouritesSections}
  <h3>ALL FAVOURITES</h3>
  <h4 className="line-over">FAVOURITELIST PERSONS</h4>
  <div className="planets">{favouriteList}</div>
  <h4 className="line-over">FAVOURITELIST PLANETS</h4>
  <div className="persons">{favouriteListPlanets}</div>
  </div>
)
//----------------------------Favourites End

//--------------------------------------------------------------Screen
  let content = null;
  switch (currentScreen) {
      case WELCOME:
          content = ( <Welcome /> )
          break;
      case PERSONS:
          content = ( <Persons
          personWithPlanet= {personWithPlanet} // Ordered List from api
          isLoading={isLoading} // Show when loading boolean, under favorite from persons callback
          onChildClick={handleChildClick}
          favouritesPar={favourites} /> )
          break;
      case PLANETS:
          content = ( <Planets
          planetsAll= {planetsAll} // Ordered List from api
          isLoadingPlanets={isLoadingPlanets} // Show when loading boolean, under favorite from persons callback
          onChildClickPlanets={handlePlanetsChildClick}
          favouritesPlanetPar={favouritesPlanets} /> )
          break;
      case FAVORITES:
          content = ( favouriteListPersonsPlanets )
          break;
      case ADDSHOWPERSONS:
            content = ( favouriteListAndForm )
            break;
      case ADDSHOWPLANETS:
            content = ( favouriteListAndFormPlanets )
            break;
      default:
          content = ( <Welcome /> )
}
//-----------------------------------Screen End

//-----------------------------------Get lenghts
useEffect(() => { 
  const fetchData = async () => {
    const respPeople = await axios(
      `https://swapi.dev/api/people/`
    );
    const respPlanets = await axios(
      `https://swapi.dev/api/planets/`
    );
    setLengthPersons(Math.ceil(respPeople.data.count / respPeople.data.results.length))
    setLenghtPlanets(Math.ceil(respPlanets.data.count / respPeople.data.results.length))
       // console.log(respPeople.data)
       // console.log(respPlanets.data)
    };
    fetchData(); 
  }, []);

//-----------------------------------Get persons
useEffect(() => {
  const fetchPersonsAll= async () => {
    const personsListToState = [];
    for(let i=1; i <= lengthPersons ; i++) { 
      
      const respPersonsRest = await axios(
        `https://swapi.dev/api/people/?page=${i}`
      );
      const peopleList = (await (respPersonsRest.data.results))
      for(let u=0; u < peopleList.length; u++) {
        personsListToState.push(peopleList[u])
        }
         // setPersonAll(respPersonsRest.data.results);
         // console.log(respPersonsRest.data)
      };
      setPersonAll(personsListToState);
      //console.log(personsListToState)
    };
    fetchPersonsAll();
  }, [lengthPersons]);

//-----------------------------------Get planets
useEffect(() => {
  const fetchPlanetsAll= async () => {
    const planetsListToState = [];
    for(let i=1; i <= lengthPlanets; i++) { 
    
      const respPlanetsRest = await axios(
        `https://swapi.dev/api/planets/?page=${i}`
      );
      const planetsList = (await (respPlanetsRest.data.results))
      for(let u=0; u < planetsList.length; u++) {
        planetsListToState.push(planetsList[u])
      }
    };
    setPlanetsAll(planetsListToState);
    setIsLoadingPlanets(false)
    //console.log(planetsListToState)
  };
  fetchPlanetsAll();
}, [lengthPlanets]);

//-----------------------------------Put homeworl in place instead of URL
const personPlanetFunction = (planetsArr, personsArr) => {
  const clonedArr1= [...planetsArr];
  const clonedArr2= [...personsArr]; 
  for (var i = 0; i < clonedArr2.length; i++) {
      for (var k = 0; k < clonedArr1.length; k++) {
          if (clonedArr2[i].homeworld === clonedArr1[k].url) {
          clonedArr2[i].homeworld = clonedArr1[k].name;
          break;
          }
      }
      setIsLoading(false);
  }
  setPersonWithPlanet(clonedArr2)
  //console.log(clonedArr2)
}

useEffect(() => {
  personPlanetFunction(planetsAll,personAll)
}, [personAll, planetsAll]);



  return (
    <div className="App">

      <header className="App-header">
          <img src={Logo} alt='website logo' />
      <div className="navDiv">
      <nav>
      <button onClick={welcomeScreen}> Home </button>
      <button onClick={personsScreen}> Persons </button>
      <button onClick={planetsScreen}> Planets </button>
      <button onClick={favouritesScreen}> Favourites </button>
      </nav>
      </div>
      </header>
      <main>
        <div className="main-widht">{content}</div>
      </main>
    </div>
  );
}




export default App;
