import { useNavigate, useSearchParams } from "react-router-dom";
import useGeolocation from "../hooks/UseGeolocation";
import Button from "./Button";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "../context/CitiesContext";
import PropTypes from "prop-types";
import { emojiToCountryCode } from "./CityItem";
export default function Map() {
  const { cities } = useContext(CitiesContext);

  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([41.505, -0.09]);
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  // const navigate = useNavigate();
  const {
    position: geoPosition,
    isLoading: isLoadingPosition,
    getLocation,
  } = useGeolocation();

  useEffect(
    function () {
      if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
    },
    [geoPosition]
  );

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);
  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type={"position"} onClick={getLocation}>
          {isLoadingPosition ? "loading" : `use your positon`}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup key={city.id}>
              <span>
                <img
                  src={`https://flagcdn.com/${emojiToCountryCode(
                    city.emoji
                  ).toLowerCase()}.svg`}
                  width={32}
                  alt={emojiToCountryCode(city.emoji).toLowerCase()}
                />
              </span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

ChangePosition.propTypes = {
  position: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};
