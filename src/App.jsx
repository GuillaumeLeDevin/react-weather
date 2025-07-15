import { useEffect, useState } from "react";
import loader from "./assets/loader.svg"
import browser from "./assets/browser.svg"
import Local from "./Local/Local"
import International from "./International/International"
import "./App.css"
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {

  const [weatherData, setWeatherData] = useState(null)
  const [errorInfo, setErrorInfo] = useState(null)
  const [tabs, setTabs] = useState(0);
  let urlFetch;

    const tabsList = [
        {name: "Local", component: <Local weatherData={weatherData} />},
        {name: "International", component: <International apiKey={APIKEY} />}
    ]
    if(tabs === 0){
      urlFetch = "http://api.airvisual.com/v2/nearest_city?key="
     }
     else {
      urlFetch = "http://api.airvisual.com/v2/countries?key="
     }

  useEffect(() => {
    fetch(`${urlFetch}${APIKEY}`)
    .then(response => {
      // console.log(response)
      // 400-499: Client side error
      // 500-599: Server side error
      if(!response.ok) throw new Error(`Error ${response.status}, ${response.statusText}`)
      return response.json()
    })
    .then(responseData => {
      console.log(responseData.data);
      setWeatherData({
        city: responseData.data.city,
        country: responseData.data.country,
        iconId: responseData.data.current.weather.ic,
        temperature: responseData.data.current.weather.tp
      })
    })
    .catch(err => {
      // console.log(err);
      // console.dir(err);
      setErrorInfo(err.message)
    })
  }, [])
 
  return (

      <main>
        <div className={`loader-container ${(!weatherData && !errorInfo) && "active"}`}>
          <img src={loader} alt="" />
        </div>

        {weatherData && (
          <>
            <div className="">
            {tabsList.map((tab, index) => (
                <button
                onClick={() => setTabs(index)}
                key={index}
                className="tabs"
                style={{backgroundColor: tabs === index ? "" : "#e2e8f0", border: tabs === index ? "2px solid #91cdebff" : ""}}>
                    {tab.name}
                </button>
            ))}
            </div>
            <div>
              {tabsList[tabs].component}
            </div>
          </>
        )}

        {(errorInfo && !weatherData) && (
          <>
            <p className="error-information">{errorInfo}</p>
            <img src={browser} alt="error icon" />
          </>
        )}

      </main>
  
  );
}

export default App;
