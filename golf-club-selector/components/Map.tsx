import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import getDistance from "geolib/es/getDistance";
import convertDistance from "geolib/es/convertDistance";
import colors from "@/consts/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Map = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [marker, setMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [distanceBetweenMarkers, setDistanceBetweenMarkers] =
    useState<number>(0);

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

  const calculateDistance = (
    marker: {
      latitude: number;
      longitude: number;
    },
    location: Location.LocationObject
  ) => {
    let distance = getDistance(marker, location.coords);
    distance = convertDistance(distance, "yd");
    return distance;
  };

  useEffect(() => {
    if (marker && location) {
      const distance = calculateDistance(marker, location);
      setDistanceBetweenMarkers(distance);
    }
  }, [marker, location]);

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
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setMarker({ latitude, longitude });
        }}
      >
        {marker && (
          <Marker coordinate={marker}>
            <FontAwesome6
              name="location-crosshairs"
              size={24}
              color={colors.lightBlue}
            />
          </Marker>
        )}
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
          centerOffset={{ x: 0, y: -9 }}
        >
          <FontAwesome6
            name="golf-ball-tee"
            size={24}
            color={colors.lightBlue}
        />
        {marker && location && (
          <Polyline
            coordinates={[
              {
                latitude: marker?.latitude,
                longitude: marker?.longitude,
              },
              {
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
              },
            ]}
            strokeColor={colors.gray}
            strokeWidth={1}
            lineDashPattern={[3, 3]}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
