"use client";

import { useEffect, useState } from "react";
import { fromAddress, setDefaults } from "react-geocode";
import Spinner from "./Spinner";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
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
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latiutude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.log("Fetching Coords: " + error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);

  if (loading) return <Spinner />;

  if (geocodeError)
    return <div className="text-xl">No Location Data Found</div>;

  return <div>Map</div>;
};

export default PropertyMap;
