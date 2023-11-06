import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as data from "../../package.json";

const reactNativeVersion = data.dependencies["react-native"];
const expoVersion = data.dependencies.expo;

export default function About() {
  return (
    <View>
      <View style={styles.row}>
      <Image
          source={require("../../assets/homer_simpson.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>Name:</Text>
          <Text style={styles.cell}>Peter Silie</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>E-Mail:</Text>
          <Text style={styles.cell}>peter.silie@garten.at</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>React Native Version:</Text>
          <Text style={styles.cell}>{reactNativeVersion}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>React Native Version:</Text>
          <Text style={styles.cell}>{expoVersion}</Text>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  table: {
    marginBottom: 10,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    padding: 10,
    width: 200,
    height: 100,
    textAlign: "left",
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
  },
});
