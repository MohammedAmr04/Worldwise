// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import ButtonBack from "./ButtonBack";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
import { CitiesContext } from "../context/CitiesContext";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  const { createCity } = useContext(CitiesContext);
  async function handleSubmit(e) {
    e.preventDefault();
    if (cityName) {
      const newCity = {
        cityName,
        country,
        date: date.toISOString(),
        notes,
        emoji: convertToEmoji(emoji),
        position: {
          lat: mapLat,
          lng: mapLng,
        },
      };
      await createCity(newCity);
      // TODO: Add logic to save newCity (e.g., API call or state update)
      console.log("New city created:", newCity);
      // Optionally, reset form fields here}
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await res.json();
        console.log("🟩 data: ", data);

        setCountry(data.countryName);
        setCityName(data.city);
        setEmoji(data.countryCode);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [mapLat, mapLng]);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <ButtonBack />{" "}
      </div>
    </form>
  );
}

export default Form;
