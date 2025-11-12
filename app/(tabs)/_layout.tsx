import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => null} // <— removes the whole bar
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
