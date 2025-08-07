import {useEffect, useState} from "react"
import loader from "./assets/loader.svg"
import browser from "./assets/browser.svg"
import "./App.css"
import Local from "./components/Local/Local"
import International from "./components/International/International"
import Tab from "./components/Tab/Tab"

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {
  const [weatherData, setWeatherData] = useState(undefined)
  const [errorInfo, setErrorInfo] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [countriesList, setCountriesList] = useState([])
  const [countrySelected, setCountrySelected] = useState("")

  const tabsList = [
    {
      name: "Local",
      component: <Local weatherData={weatherData}/>,
      url: `https://api.airvisual.com/v2/nearest_city?key=${APIKEY}`
    },
    {
      name: "International",
      component: <International countrySelected={countrySelected} countriesList={countriesList} />,
      url: `http://api.airvisual.com/v2/countries?key=${APIKEY}`
    },
  ]

  useEffect(() => {

    fetch(`${tabsList[activeTab].url}`)
    .then(response => {
      console.log(response);
      // 400 - 499 : Erreur clients 
      // 500 - 599 : Erreur serveur
      if(!response.ok) throw new Error(`Error ${response.status}, ${response.statusText}`)

      return response.json()
    })
    .then(responseData => {
      if(activeTab === 0) {
        setWeatherData({
        city: responseData.data.city,
        country: responseData.data.country,
        iconId: responseData.data.current.weather.ic,
        temperature: responseData.data.current.weather.tp,
        })
      }
      else if(activeTab === 1) {
        setCountriesList(responseData.data)
        console.log(responseData.data);
      }
    })
    .catch(err => {
      setErrorInfo(err.message)
    })

  }, [activeTab])

  return (
    <main>
      <div className={`loader-container ${(!weatherData && !errorInfo) && "active"}`}>
        <img src={loader} alt="loading icon" />
      </div>
      <div className="tabs-container">
        {tabsList.map((tab, index) => (
          <Tab key={index} tab={tab.name} index={index} activeTab={activeTab} onClick={() => setActiveTab(index)}/>
        ))}
      </div>
      {weatherData && (
        <>
          {tabsList[activeTab].component}
        </>
        )}

    {(errorInfo && !weatherData) && (
      <>
        <p className="error-information">{errorInfo}</p>
        <img src={browser} alt="error icon" />
      </>
    )}
    </main>
  )
}

export default App
