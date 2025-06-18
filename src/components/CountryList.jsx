import { useContext } from "react";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import { CitiesContext } from "../context/CitiesContext";
export default function CountryList() {
  const { cities } = useContext(CitiesContext || []);
  const countries = cities.reduce((arr, city) => {
    if (!arr.some((item) => item.country === city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);
  console.log("🟩 cities: ", cities);

  console.log("🟩 countries: ", countries);

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </div>
  );
}
