import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";
import Message from "./Message";

export default function CityList() {
  const { cities, loading, getCity, currentCity } = useContext(CitiesContext);
  const currentId = currentCity.id;
  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (!cities.length) {
    return <Message message="No cities found." />;
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
          onClick={() => getCity(city.id)}
        />
      ))}
    </ul>
  );
}
