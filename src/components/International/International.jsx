import "./International.css"
import React, { useEffect, useState } from 'react'

export default function International({countriesList, countrySelected, onChange}) {

  const [countries, setCountries] = useState(null)
  let countrySelectedData = countriesList.find(country => country.country === countrySelected)

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/region/europe")
    .then(data => data.json())
    .then(data => {
      data.sort((a, b) => {
        if(a.name.common < b.name.common){
          return -1
        }
        else if(a.name.common > b.name.common){
          return 1
        }
        else {
          return 0
        }
      })
      console.log(data)
      setCountries(data)
    })
  }, [])

  return (
    <>
      { countriesList && (
        <div>
          <h2 className="countries-title">Countries</h2>
          <form>
            <select
            value={countrySelected}
            className="countries-select">
              {countriesList.map((country, index) => (
                <option key={index} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </form>
        </div>
      )}
      
    </>
  )
}
