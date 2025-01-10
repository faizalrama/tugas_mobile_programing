import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Arrow from "react-native-arrow";
import { Translate } from "../services/api";

const HomeScreen = () => {
  const [input, setInput] = useState("");
  const [terjemahan, setTerjemahan] = useState([]);
  const [dari, setDari] = useState("bahasa_indonesia");
  const [ke, setKe] = useState("bahasa_takimpo");

  const Terjemahkan = async () => {
    if (!dari.trim()) {
      setTerjemahan([]);
      return;
    }
    const inputLower = input.toLowerCase();
    try {
      const data = await Translate(inputLower, dari);
      setTerjemahan(data);
      console.log(data);
    } catch (error) {
      console.error("Error Searching Translate: ", error);
    }
  };

  const Bahasa = () => {
    if (dari === "bahasa_indonesia") {
      setDari("bahasa_takimpo");
      setKe("bahasa_indonesia");
    } else {
      setDari("bahasa_indonesia");
      setKe("bahasa_takimpo");
    }
  };

  const renderTerjemahan = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productText}>{item.terjemahan}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {dari} <Arrow size={7} color={"#8B4513"} /> {ke}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={Bahasa}>
          <Text style={styles.addButtonText}>Ubah</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Masukkan teks"
          placeholderTextColor="#A0522D"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.searchButton} onPress={Terjemahkan}>
          <Icon name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList data={terjemahan} renderItem={renderTerjemahan} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF8F0", // Latar belakang putih krem
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8B4513", // Warna coklat untuk teks judul
  },
  addButton: {
    backgroundColor: "#FFB6C1", // Warna pink
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#8B4513", // Warna coklat lembut
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#8B4513", // Warna coklat
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  productItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C", // Warna coklat muda
    backgroundColor: "#FFFAF0", // Latar belakang putih krem
    borderRadius: 8,
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
    color: "#8B4513", // Warna coklat
  },
});
