import { useState, useEffect } from "react"

export default function Local({apiKey}) {
    const [countriesList, setCountriesList] = useState(undefined)
    const [myData, setMyData] = useState(undefined);

    const countriesListe = [];

    useEffect(() => {
        fetch(`http://api.airvisual.com/v2/countries?key=${apiKey}`)
        .then(response => {
            // console.log(response)
            if(!response.ok) throw new Error(`Error: ${response.status}: ${response.statusText}`)
            return response.json()
        })
        .then(responseData => {
            setCountriesList(responseData)
            console.log("APIkey",apiKey, "ResponseData", responseData.data, "Countrie", countriesList)
            })
    }, [])


  return (
    <>
        {countriesList && (
            <div>
                <label htmlFor="country-choice">Choose a Country:</label>
                    <div>
                        {countriesList.map((country, index) => {
                            <div key={index} >{country}</div>
                        })}
                    </div>
                    
            </div>
        )}
    </>
  )
}