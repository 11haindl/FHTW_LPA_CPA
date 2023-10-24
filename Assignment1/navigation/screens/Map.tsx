import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Papa from "papaparse";
import * as Location from "expo-location";

interface ILocation {
  latitude: number;
  longitude: number;
}

type MapProps = {
  navigation: any;
};

type CsvRow = {
  HALTESTELLEN_ID: string;
  NAME: string;
  WGS84_LAT: string;
  WGS84_LON: string;
  // Weitere Spalten mit ihren jeweiligen Typen hinzufügen
};

export default function Map({ navigation }: MapProps) {
  const [markers, setMarkers] = React.useState<CsvRow[]>([]);
  const [userLocation, setUserLocation] = React.useState<ILocation | undefined>(
    undefined
  );

  // Standort abrufen und `expo-location` verwenden
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Berechtigung verweigert");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  React.useEffect(() => {
    getUserLocation();
    console.log(userLocation);

    // CSV-Daten abrufen und parsen
    fetch("https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parsedData = Papa.parse(csv, { header: true }).data as CsvRow[];
        setMarkers(parsedData);
      });
  }, []);

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.2395854,
            longitude: 16.3743125,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0321,
          }}
        >
          {markers.map((marker, index) => {
            const latitude = parseFloat(marker.WGS84_LAT);
            const longitude = parseFloat(marker.WGS84_LON);

            if (!isNaN(latitude) && !isNaN(longitude)) {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude,
                    longitude,
                  }}
                  title={marker.NAME}
                  description={marker.HALTESTELLEN_ID}
                ></Marker>
              );
            }
            return null;
          })}

          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Dein Standort"
              pinColor="blue"
            />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
