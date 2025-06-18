import { createContext } from "react";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:3001";

function CitiesProvider({ children }) {
  // You can define your context value here
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchCities() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        console.log("🟩 cities: ", data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        setCities,
        setCurrentCity,
        loading,
        setLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CitiesContext, CitiesProvider };
