import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";

export default function CityList() {
  const { cities, loading, setCurrentCity, currentCity } =
    useContext(CitiesContext);
  const currentId = currentCity.id;
  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          key={city.id}
          cityName={city.cityName}
          position={city.position}
          date={city.date}
          emoji={city.emoji}
          id={city.id}
          currentId={currentId}
          onClick={() => setCurrentCity(city)}
        />
      ))}
    </ul>
  );
}
