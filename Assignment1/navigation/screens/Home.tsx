import * as React from "react";
import {
  View,
  Text,
  VirtualizedList,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  TextInput,
} from "react-native";
import Papa from "papaparse";

type CsvRow = {
  HALTESTELLEN_ID: string;
  NAME: string;
  // Add more columns with their respective types as needed
};

export default function Home() {
  const [data, setData] = React.useState<CsvRow[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [station, setStation] = React.useState('');

  React.useEffect(() => {
    // Replace 'your_csv_url_here' with the actual URL of your CSV file.
    fetch("https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv")
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
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.NAME}</Text>
        {/* Add more Text components for other columns as needed */}
      </View>
    );
  };

  function addNewStation() {

    const newId = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    // Erstelle einen neuen Eintrag
    const newStation: CsvRow = {
      HALTESTELLEN_ID: newId.toString(), // Setze hier eine neue eindeutige ID
      NAME: station, // Setze hier den Namen der neuen Haltestelle
      // Füge weitere Spalten und ihre Werte hinzu, falls erforderlich
    };

    // Kopiere die vorhandenen Daten und füge den neuen Eintrag hinzu
    const newData = [...data, newStation];

    // Setze die aktualisierten Daten
    setData(newData);
    setModalVisible(!modalVisible)
    console.log(newData);
  }

  return (
    <>
      <VirtualizedList
        data={data}
        initialNumToRender={20} // Adjust as needed
        renderItem={renderItem}
        keyExtractor={(item) => item.HALTESTELLEN_ID}
        getItemCount={getItemCount}
        getItem={getItem}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Stationsname:</Text>
            <TextInput 
              style={styles.input}
              onChangeText={setStation}
              value={station}
            />
            <Pressable
              style={[styles.button]}
              onPress={addNewStation}
            >
              <Text style={styles.textStyle}>Station hinzufügen</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  itemText: {
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "dodgerblue"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: 100,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
