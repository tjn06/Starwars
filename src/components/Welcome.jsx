import React from 'react';
import '../App.css';
import Dart from './dart.jpg';
//prentential component, behövs ingen state

const Welcome = () => (
    <section >
        <h3 >WELCOME</h3>
        <span className="added-mess">SEARCH FOR PERSONS OR PLANETS FROM THE STARWARS-UNIVERSE!<br></br>
        ADD THEM TO YOUR FAVOURITELIST OR CREATE YOUR OWN FAVOURITE PLANETS AND CHARACTERS.</span>

        <img className="space-bet-image" src={Dart} alt='website logo' />
   
    </section>
)

export default Welcome;