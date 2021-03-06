
export default class SwapiServices {

    _apiBase = 'https://swapi.dev/api';
    _imgBase = 'https://starwars-visualguide.com/assets/img'
    getDataFromSwapi = async (url)=> {
        try {
            const resolve = await fetch(`${this._apiBase}${url}`);
            return await resolve.json();
            
        } catch (err) {
            console.error(err);
        }

    }

    getAllPeople = async () => {
        
        const res = await this.getDataFromSwapi(`/people/`);
        return await res.results.map(this._peopleTransformator)
    }
    getPerson = async (id) => {

        const person =  await this.getDataFromSwapi(`/people/${id}`);
        return this._peopleTransformator(person);
    }
    
    getAllPlanets = async () => {
        
        const res = await this.getDataFromSwapi(`/planets/`);
        return res.results.map(this._planetTransformation)
        
    }
    getPlanet = async (id) => {
        const planet = await this.getDataFromSwapi(`/planets/${id}`);
        return this._planetTransformation(planet);

    }

    getAllStarships = async () => {

        const res = await this.getDataFromSwapi(`/starships/`);
        return res.results.map(this._transformStarships)
        
    }
    getStarship= async (id) => {
        
        const starship = await this.getDataFromSwapi(`/starships/${id}`);
        return this._transformStarships(starship);
    }

    idRegExpFinder(urlItem){

        const idReg = /([0-9]{1,2})/;
        const id = urlItem.url.match(idReg)[0];
        return id;
    }

    _planetTransformation = (planet)=>{
        const id = this.idRegExpFinder(planet);
        return {
            id,
            'Name': planet.name,
            'Population': planet.population,
            'RotationPeriod': planet.rotation_period,
            'Diameter': planet.diameter,
        }
    }

    _peopleTransformator=(person)=>{

        return{
            id: this.idRegExpFinder(person),
            'Name': person.name,
            'Gender': person.gender,
            'Birth year': person.birth_year,
            'Eye color': person.eye_color,
        }
    }

    _transformStarships=(starship)=>{

        return{
            id: this.idRegExpFinder(starship),
            'Name': starship.name,
            'Model': starship.model,
            'Manufacturer': starship.manufacturer,
            'Cost In Credits': starship.costInCredits,
            'Length': starship.length,
            'Passengers': starship.passengers,
            'Cargo Capacity': starship.cargoCapacity 
        }
    }

    imagePersonDownloader =(id) =>{
       
       return `${this._imgBase}/characters/${id}.jpg`
         
    }

    imagePlanetDownloader =(id) =>{

        if(Number(id) === 1 ){
            return 'https://vignette.wikia.nocookie.net/starwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131019121937'
        }
        return `${this._imgBase}/planets/${id}.jpg`
         
    }

    imageStarshipDownloader =(id) =>{

        if(Number(id) === 2){
            return `https://vignette.wikia.nocookie.net/rustarwars/images/b/b0/Corvette-CHRON.jpg/revision/latest?cb=20131105141107`;
        }else if(Number(id) === 3){
            return `https://vignette.wikia.nocookie.net/starwars/images/2/2a/ISD-SWE.png/revision/latest?cb=20140718023302`;
        }
        return `${this._imgBase}/starships/${id}.jpg`
         
    }
}



