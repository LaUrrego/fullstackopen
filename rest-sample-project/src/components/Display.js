const Display = ({countries}) => {
    console.log("from Display:", countries)
    const countryObject = Array.isArray(countries)? countries[0] : countries
    
    const languagesArr = Object.values(countryObject.languages);
    const flag = countryObject.flags.png

    return (
        <div>
          <h1>{countryObject.name.common}</h1>
          <p>capital: {countryObject.capital}</p>
          <p>area: {countryObject.area}</p>
          <h2>Languages</h2>
          <ul>
            {languagesArr.map((lang, key) => <li key={key}>{lang}</li>)}
          </ul>
          <img src={flag} alt="flag"/>
        </div>
      )
}

export default Display