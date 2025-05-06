"use client";

import { useEffect, useState } from "react";
import { fromAddress, setDefaults } from "react-geocode";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [viewport, setViewport] = useState({
    latiutude: 0,
    longitude: 0,
    zoom: 12,
    height: "100%",
    width: "500px",
  });

  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY,
    language: "en",
    region: "nl",
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }
        const { lat, long } = res.results[0].geometry.location;
        console.log(lat, lang);
      } catch (error) {
        console.log("Fetching Coords: " + error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);

  return <div>Map</div>;
};

export default PropertyMap;
