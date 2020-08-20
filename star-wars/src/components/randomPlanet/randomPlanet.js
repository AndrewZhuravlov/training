/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import s from './randomPlanet.css';
import SwapiServices from './../swapiService/swapiService'
import Spinner from '../spinner/spinner';

export default class RandomPlanet extends Component {
    
    constructor(){
        super();
        this.updateState();
    }
    
    state = {
        planet:{} 
    }
    randomID = Math.floor(Math.random() * 20 + 1);
    swapi = new SwapiServices();
    
    onPlanetLoaded = (planet) => {

        this.setState({ planet });
    }

    updateState() {
        
        this.swapi.getPlanet(this.randomID)
            .then(this.onPlanetLoaded)
            
    }

    
    render() {

        const { planet: { name, population, rotationPeriod, diameter, id } } = this.state;
        return(
            <div>
                <Spinner/>
            </div>
        )
        return (

            <div className='planetWrapper'>
                <div className="row">
                    <div className="col-md-3">
                        <a className='planet_image' href='#'><img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="planet-picture" /></a>
                    </div>
                    <div className="col-md-4">
                        <div className="planetInfo">
                            <div className="planetName">
                                <span>{name}</span>
                            </div>
                            <div className="planetDescription">
                                <div className="planetDescriptionItem">
                                    <span>Population: </span><span>{population}</span>
                                </div>
                                <div className="planetDescriptionItem">
                                    <span>Rotation period: </span><span>{rotationPeriod}</span>
                                </div>
                                <div className="planetDescriptionItem">
                                    <span>Diameter: </span><span>{diameter}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">

                    </div>
                </div>
            </div>
        )
    }
}