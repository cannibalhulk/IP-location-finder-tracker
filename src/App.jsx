import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Markerposition from "./Markerposition";
import arrowSVG from "../images/icon-arrow.svg";
import "../images/pattern-bg.png";

export default function App() {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  // const checkIpAddress =
  //   /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  // const checkDomain =
  //   /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(
          'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation?apikey=873dbe322aea47f89dcf729dcc8f60e8&ip=102.89.12.202',{
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'c9dc44a9eemsh307e2412333a4fap13b1c6jsnce35f26b6121',
              'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
            }
          });
        const data = await res.json();
        setAddress(data);
        console.log(data);
      };
      getInitialData();
    } catch {
      console.log(error);
    }
  }, []);

  const getEnteredAddress = async() => {
    const res = await fetch(`https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation?apikey=873dbe322aea47f89dcf729dcc8f60e8&ip=${ipAddress}`,{
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c9dc44a9eemsh307e2412333a4fap13b1c6jsnce35f26b6121',
        'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
      }
    });
    const data = await res.json();
    setAddress(data);
    console.log(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getEnteredAddress();
    setIpAddress("")
  }

  

  return (
    <>
      <section>
        <div className="pattern-bg">
          <img src="../images/pattern-bg.png" />
        </div>

        <article className="center-form">
          <h1>IP Address Tracker</h1>
          <form autoComplete="off" onSubmit={(e)=>handleSubmit(e)}>
            <input
              type="text"
              name="ipaddress"
              id="ipaddress"
              placeholder="Search for any IP address"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              required
            />
            <button type="submit">
              <img src={arrowSVG} alt="arrow_r" />
            </button>
          </form>
        </article>

        {address && (
          <>
            <article className="details" style={{ zIndex: "1000" }}>
              <div>
                <h2>IP ADDRESS</h2>
                <p>{address.ip}</p>
              </div>
              <div>
                <h2>LOCATION</h2>
                <p>
                  {address.city}, {address.stateCode} {address.zipCode}
                </p>
              </div>
              <div>
                <h2>COUNTRY</h2>
                <p>{address.country}</p>
              </div>
              <div>
                <h2>TIMEZONE</h2>
                <p>{address.gmt}</p>
              </div>
            </article>
            <MapContainer
              center={[address.latitude,address.longitude]}
              zoom={13}
              scrollWheelZoom={true}
              style={{
                width: "100vw",
                height: "650px",
                marginTop: "-105px",
                position: "absolute",
                top: "480px",
                zIndex: "-1",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Markerposition address={address}/>
            </MapContainer>
          </>
        )}
      </section>
    </>
  );
}