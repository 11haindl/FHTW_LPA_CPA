import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, VirtualizedList, StyleSheet, StatusBar } from 'react-native';
import Papa from 'papaparse';
import { SafeAreaView } from 'react-native-safe-area-context';

type StationData {
  NAME: string;
  WGS84_LAT: number;
  WGS84_LON: number;
  // Add more fields as needed
}

const StationList: React.FC = () => {
  const [data, setData] = useState<StationData[]>([]);

  useEffect(() => {
    const csvFileUrl = 'https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv';

    fetch(csvFileUrl)
      .then(async (response) => {
        const csvText = await response.text();

        Papa.parse<StationData>(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setData(result.data);
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching or parsing the CSV data:', error);
      });
  }, []);

  return (
    <View>
      <Text>List of Data:</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Station Name: {item.NAME}</Text>
            <Text>Latitude: {item.WGS84_LAT}</Text>
            <Text>Longitude: {item.WGS84_LON}</Text>
          </View>
        )}
      />
    </View>
  );
};


export default StationList;
