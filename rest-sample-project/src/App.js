import {useState, useEffect} from 'react'
import axios from 'axios'
import Display from './components/Display'

const Results = ({countries}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  
  const showButtonHandler = (country) => { 
    console.log("button pressed. had:", [country]);
    setSelectedCountry([country])
}
  useEffect(()=>{
    setSelectedCountry(null);
  },[countries]); 

  if (selectedCountry !== null) {return <Display countries={selectedCountry} />;}
  if (countries.length === 0) {return console.log("No search yet")}
  else if (countries.length > 10) {return <div>Too many results! Specify your search</div>}
  else if (countries.length === 1) { 

    return (
    <div>
      <Display countries={countries} />
    </div>
  )} else {
    console.log(countries)
  return (
    <div>
      {countries.map((country, key)=> <div key={key}>{country.name.common}<button onClick={()=>showButtonHandler(country)}>show</button></div>)}
    </div>
  )
}}


function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRes, setFilterRes] = useState([])
  
  const URL = "https://studies.cs.helsinki.fi/restcountries/api/all"
 

  useEffect(()=> {
    const request = axios.get(`${URL}`)
    request.then(response => {
      setCountries(response.data)
    })
    .catch(error => console.log("ERROR:", error))
  },[])

 

  const searchHandler = (event) => {
    console.log("search term: ", event.target.value);
    setSearchTerm(event.target.value)
    
    const foundCountries = countries.filter(x => x.name.common.toLowerCase().includes(event.target.value.toLowerCase()) )
    console.log("found countries: ", foundCountries)
    setFilterRes(foundCountries)
  }

  

  return (
    <div>
      <div>
        find countries: 
        <input type="text" value={searchTerm} onChange={searchHandler} />
      </div>
      <Results countries={filterRes} />
    </div>
  );
}

export default App;
