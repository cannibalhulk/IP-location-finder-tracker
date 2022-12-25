import React, { useEffect, useMemo } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import icon from "./icon"

export default function Markerposition({address}) {
    const position =useMemo(()=>{
        return [address.latitude,address.longitude]
    },[address.latitude,address.longitude]) 
    const map = useMap()

    useEffect(()=>{
      map.flyTo(position, 13, {
        animate: true
      })
    },[map, position])
  
  
    return(
        <>
            <Marker icon={icon} position={position}>
              <Popup>
                Elon was here! <br /> 
              </Popup>
            </Marker>
        </>
    )
}