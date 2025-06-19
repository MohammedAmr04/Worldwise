import { useContext } from "react";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import { CitiesContext } from "../context/CitiesContext";
import Message from "./Message";

export default function CountryList() {
  const { cities } = useContext(CitiesContext);
  const countries = cities.reduce((arr, city) => {
    if (!arr.some((item) => item.country === city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  if (!countries.length) {
    return <Message message="No countries found." />;
  }

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </div>
  );
}
