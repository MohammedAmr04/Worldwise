import { useNavigate, useSearchParams } from "react-router-dom";
import useGeolocation from "../hooks/UseGeolocation";
import Button from "./Button";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    position,
    isLoading: isLoadingPosition,
    getLocation,
  } = useGeolocation();

  function MyComponent() {
    const map = useMapEvents({
      click: () => {
        navigate("form");
        map.locate();
      },
      locationfound: (location) => {
        console.log("🟩 location: ", location);

        setSearchParams({ lat: location.latlng.lat, lng: location.latlng.lng });
      },
    });
    return null;
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={position || [51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        {!position && (
          <Button type={"position"} onClick={getLocation}>
            {isLoadingPosition ? "loading" : `use your positon`}
          </Button>
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyComponent />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
