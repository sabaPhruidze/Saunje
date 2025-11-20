import React from "react";
import { Dimensions, Text, View } from "react-native";

interface EmptyStateProps {
  isLight: boolean;
}

const { width } = Dimensions.get("window");
const EmptyState = ({ isLight }: EmptyStateProps) => {
  return (
    <View>
      <Text>EmptyState</Text>
    </View>
  );
};

export default EmptyState;
