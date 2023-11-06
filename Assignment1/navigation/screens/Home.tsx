import * as React from "react";
import { View, Text, VirtualizedList, StyleSheet, Modal, Pressable, TextInput } from "react-native";
import { fetchStations } from "../../StationsFetcher";
import { Station } from "../../Station";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<Station[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [station, setStation] = useState("");

  useEffect(() => {
    // fetch data from csv
    fetchStations().then((result) => {
      setData(result)
    });
  }, []);

  function addNewStation() {
    // create a random 8-digit number as id of the new Station
    const newId =
      Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    // create a new Station Object
    const newStation: Station = {
      HALTESTELLEN_ID: newId.toString(),
      NAME: station,
      WGS84_LAT: "",
      WGS84_LON: ""
    };
    // copy data to new array and add the created Station
    const newData = [...data, newStation];
    // Updata data
    setData(newData);
    //close Modal
    setModalVisible(!modalVisible);
    console.log(newData);
  }

  // get number of items that should be displayed
  const getItemCount = () => data.length;

  const getItem = (data: Station[], index: number) => data[index];

  const renderItem = ({ item }: { item: Station }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.NAME}</Text>
        {/* Add more Text components for other columns as needed */}
      </View>
    );
  };

  return (
    <>
      <VirtualizedList
        data={data} // Data used for displaying
        initialNumToRender={10} // Number of items rendered at the beginning
        renderItem={renderItem} // single Item of the List
        keyExtractor={(item) => item.HALTESTELLEN_ID} //unique key for each component
        getItemCount={getItemCount} // total number of list entries
        getItem={getItem} // get data of items that will be rendered in renderItem
      />
      <Modal
        animationType="slide" // slide from bottom when Modal opens
        transparent={true} // Background of Modal is transparent
        visible={modalVisible} // if modalVisible = true Modal is open, if not it is closed
        onRequestClose={() => {
          // function called when closing the modal
          setModalVisible(!modalVisible);
        }}
      >
        {/* Content of the modal */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Stationsname:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setStation}
              value={station}
            />
            <Pressable style={[styles.button]} onPress={addNewStation}>
              <Text style={styles.textStyle}>Station hinzufügen</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Button for opening Modal and add a new Station */}
      <Pressable style={[styles.button]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Station hinzufügen</Text>
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
    backgroundColor: "dodgerblue",
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
