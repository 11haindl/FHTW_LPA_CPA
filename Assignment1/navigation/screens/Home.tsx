import * as React from 'react';
import { View, Text, VirtualizedList } from 'react-native';
import Papa from 'papaparse';
import StationList from '../../station-list/StationList';
import { ScrollView } from 'react-native-gesture-handler';

type CsvRow = {
    HALTESTELLEN_ID: string;
    NAME: string;
    // Add more columns with their respective types as needed
  };

export default function Home() {
    const [data, setData] = React.useState<CsvRow[]>([]);

  React.useEffect(() => {
    // Replace 'your_csv_url_here' with the actual URL of your CSV file.
    fetch('https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv')
      .then((response) => response.text())
      .then((csv) => {
        // Parse the CSV data using PapaParse
        const { data } = Papa.parse<CsvRow>(csv, { header: true });
        setData(data);
      });
  }, []);

  const getItemCount = () => data.length;
  const getItem = (data: CsvRow[], index: number) => data[index];

  const renderItem = ({ item }: { item: CsvRow }) => {
    return (
      <View>
        <Text>{item.HALTESTELLEN_ID}: {item.NAME}</Text>
        {/* Add more Text components for other columns as needed */}
      </View>
    );
  };

    return (
        <VirtualizedList
      data={data}
      initialNumToRender={20} // Adjust as needed
      renderItem={renderItem}
      keyExtractor={(item) => item.HALTESTELLEN_ID}
      getItemCount={getItemCount}
      getItem={getItem}
    />
    );
}