import React = require("react");
import { Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Profile Page
      </Text>
    </View>
  );
}
