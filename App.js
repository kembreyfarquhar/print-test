import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { StarPRNT } from "react-native-star-prnt";

export default function App() {
  async function connect(e) {
    e.preventDefault();
    try {
      const connect = await StarPRNT.connect("192.168.1.120", "EscPos", false);
    } catch (e) {
      return Alert.alert(
        "Sorry",
        "There was an error when trying to connect to your printer",
        [{ text: "Okay" }]
      );
    }
  }

  let commandsArray = [];
  commandsArray.push({ appendAlignment: StarPRNT.AlignmentPosition.Center });
  commandsArray.push({ appendFontStyle: "A" });
  commandsArray.push({ append: "Star Clothing Boutique\n" });
  commandsArray.push({ appendLineFeed: 2 });
  commandsArray.push({ appendAlignment: StarPRNT.AlignmentPosition.Left });
  commandsArray.push({ appendFontStyle: "B" });
  commandsArray.push({ append: "Here is some text.\n" });
  commandsArray.push({ enableInvert: true });
  commandsArray.push({ appendInvert: "Inverted text\n" });
  commandsArray.push({
    appendCutPaper: StarPRNT.CutPaperAction.PartialCutWithFeed,
  });

  async function print(e) {
    e.preventDefault();
    try {
      let printResult = await StarPRNT.print(
        "EscPos",
        commandsArray,
        "192.168.1.120"
      );
      console.log(printResult); // Success!
    } catch (e) {
      return Alert.alert(
        "Sorry",
        "There was an error when trying to print from your printer",
        [{ text: "Okay" }]
      );
    }
  }

  async function disconnect(e) {
    e.preventDefault();
    try {
      let disconnected = await StarPRNT.disconnect();
    } catch (e) {
      return Alert.alert(
        "Sorry",
        "There was an error when trying to disconnect from your printer",
        [{ text: "Okay" }]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Connect to printer" onPress={connect} />
      <Text>Ready to Print?</Text>
      <Button title="Press to Print!" onPress={print} />
      <Text>Disconnect printer.</Text>
      <Button title="Disconnect" onPress={disconnect} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
