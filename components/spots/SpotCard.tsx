import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface SpotLocation {
  latitude: number;
  longitude: number;
}
export type Spot = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: SpotLocation;
  userId?: string;
};
type SpotCardProps = {
  item: Spot;
  isLight: boolean;
  handleDelete: (spotId: string) => void;
  curretUserId?: string;
};
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

const SpotCard = ({
  item,
  isLight,
  handleDelete,
  curretUserId,
}: SpotCardProps) => {
  //ვაზუსტებ თუ არის ამით მომხმარებელი მესაკუთრე
  const isOwner = item.userId === curretUserId;
  return (
    <Pressable
      style={[
        isLight ? styles.spotCardLight : styles.spotCardDark,
        styles.spotCard,
      ]}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.spotImage} />
      {isOwner && (
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash" size={20} color="white" />
        </Pressable>
      )}
      <Text
        style={isLight ? styles.spotTitleLight : styles.spotTitleDark}
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <Text
        style={
          isLight ? styles.spotDescriptionLight : styles.spotDescriptionDark
        }
        numberOfLines={2}
      >
        {item.description}
      </Text>
      {item.location && (
        <View>
          <Ionicons
            name="location-sharp"
            size={14}
            color={isLight ? "#667" : "#ccc"}
          />
          <Text
            style={isLight ? styles.locationTextLight : styles.locationTextDark}
          >
            {item.location.latitude.toFixed(4)},{" "}
            {item.location.longitude.toFixed(4)}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default SpotCard;

const styles = StyleSheet.create({
  spotCard: {
    width: CARD_WIDTH,
    marginRight: 16,
    marginBottom: 8,
  },
  spotCardLight: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  spotCardDark: {
    backgroundColor: "#252525",
    borderRadius: 8,
    padding: 16,
    borderColor: "#333333",
    borderWidth: 1,
  },
  spotImage: {
    width: "100%",
    height: 150,
    borderRadius: 6,
    marginBottom: 10,
    resizeMode: "cover",
  },
  spotTitleLight: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  spotTitleDark: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E0E0E0",
  },
  spotDescriptionLight: {
    fontSize: 14,
    color: "#667",
    marginTop: 4,
  },
  spotDescriptionDark: {
    fontSize: 14,
    color: "#CCC",
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    opacity: 0.8,
  },
  locationTextLight: {
    fontSize: 12,
    color: "#333",
    marginLeft: 4,
  },
  locationTextDark: {
    fontSize: 12,
    color: "#CCC",
    marginLeft: 4,
  },
  deleteButton: {
    position: "absolute",
    top: 24,
    right: 24,
    backgroundColor: "rgba(220, 50, 50, 0.7)", // წითელი, გამჭვირვალე ფონი
    padding: 6,
    borderRadius: 20,
    zIndex: 1,
  },
});
