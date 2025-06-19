import { createContext, useReducer } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:3001";

const initState = {
  cities: [],
  currentCity: {},
  loading: false,
  error: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, loading: true };
    }
    case "cities/loaded": {
      return { ...state, cities: action.payload, loading: false };
    }
    case "city/loaded": {
      return { ...state, currentCity: action.payload };
    }
    case "city/create": {
      return { ...state, cities: [...state.cities, action.payload] };
    }
    case "city/delete": {
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    }
    case "rejected": {
      return { ...state, error: "rejected" };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
}

function CitiesProvider({ children }) {
  // You can define your context value here
  const [{ cities, currentCity, loading, error }, dispatch] = useReducer(
    reducer,
    initState
  );
  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log("🟩 cities: ", data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "rejected" });
      }
    }
    fetchCities();
  }, []);

  async function createCity(city) {
    try {
      await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      dispatch({ type: "city/create", payload: city });
    } catch (er) {
      dispatch({ type: "rejected" });
      console.error(er);
    }
  }
  async function getCity(id) {
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected" });
      console.error(error);
    }
  }
  async function deleteCity(id) {
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", payload: id });
    } catch (err) {
      dispatch({ type: "rejected" });
      console.error(err);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        loading,
        getCity,
        error,
        createCity,
        deleteCity,
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
