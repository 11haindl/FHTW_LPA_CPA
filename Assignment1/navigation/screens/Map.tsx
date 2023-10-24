import * as React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Papa from "papaparse";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

interface ILocation {
  latitude: number;
  longitude: number;
}

// Definition of object "Station"
type Station = {
  // Properties of object - names are as they are in the csv-file
  HALTESTELLEN_ID: string;
  NAME: string;
  WGS84_LAT: string;
  WGS84_LON: string;
};

export default function Map() {
  const [markers, setMarkers] = useState<Station[]>([]);
  const [userLocation, setUserLocation] = useState<ILocation | undefined>(
    undefined
  );

  // get current location with expo-location
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    //check for permission
    if (status !== "granted") {
      console.log("Berechtigung verweigert");
      return;
    }

    // get location
    const location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    getUserLocation();

    // fetch data from csv
    fetch("https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv")
      .then((response) => response.text())
      .then((csv) => {
        // Parse csv data to get an array of Station objects
        const parsedData = Papa.parse(csv, { header: true }).data as Station[];
        setMarkers(parsedData);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* Create the Map */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.2395854,
            longitude: 16.3743125,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          { /* foreach marker in the markers array */
          markers.map((marker, index) => {
            // get latitude and longitude
            const latitude = parseFloat(marker.WGS84_LAT);
            const longitude = parseFloat(marker.WGS84_LON);

            // check if latitude and longitude are numbers
            if (!isNaN(latitude) && !isNaN(longitude)) {
              return (
                // create a Marker on the Map
                <Marker
                  key={index}
                  coordinate={{
                    latitude,
                    longitude,
                  }}
                  title={marker.NAME}
                ></Marker>
              );
            }
            return null;
          })}

          {userLocation && ( // if userLocation exists  render the Marker
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Mein Standort"
              pinColor="blue"
            />
          )}
        </MapView>
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
