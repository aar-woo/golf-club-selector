import { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";

const Map = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{
          height: 250,
          width: 350,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        region={
          location?.coords && {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0008,
            longitudeDelta: 0.0008,
          }
        }
      >
        <Marker
          coordinate={
            location?.coords
              ? {
                  latitude: location?.coords.latitude,
                  longitude: location?.coords.longitude,
                }
              : {
                  latitude: 0,
                  longitude: 0,
                }
          }
        />
      </MapView>
    </View>
  );
};

export default Map;
