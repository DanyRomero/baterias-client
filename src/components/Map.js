import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const center = { lat: 19.447667288212166, lng: -99.12989106009955 };

  if (!isLoaded) {
    return <CircularProgress />;
  }
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={10}
      center={center}
      options={{ disableDefaultUI: true }}
    />
  );
};

export default Map;
