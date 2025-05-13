import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import getDistance from "geolib/es/getDistance";
import convertDistance from "geolib/es/convertDistance";
import colors from "@/consts/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
interface MapProps {
  width?: number;
  height?: number;
  fullScreen?: boolean;
  markerDistance?: number | null;
  handleMarkerChange?: (distance: number | null) => void;
}

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: "#8f8f8f",
    borderRadius: 15,
  },
  map: {
    alignItems: "center",
    borderRadius: 15,
  },
});

const Map = ({
  width = 340,
  height = 250,
  fullScreen = false,
  markerDistance,
  handleMarkerChange,
}: MapProps) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [marker, setMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;

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
    distance = Math.round(convertDistance(distance, "yd"));
    return distance;
  };

  useEffect(() => {
    if (marker && location) {
      const distance = calculateDistance(marker, location);
      handleMarkerChange && handleMarkerChange(distance);
    }
  }, [marker, location]);

  return (
    <View
      style={{
        ...styles.mapContainer,
        padding: fullScreen ? 0 : 8,
      }}
    >
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{
          ...styles.map,
          height: fullScreen ? deviceHeight : height,
          width: fullScreen ? deviceWidth : width,
        }}
        region={
          location?.coords && {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0015,
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
        </Marker>
        {marker && location && (
          <View>
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
            <Marker
              coordinate={{
                latitude: (marker.latitude + location.coords.latitude) / 2,
                longitude: (marker.longitude + location.coords.longitude) / 2,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View
                style={{
                  backgroundColor: colors.primaryBlue,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {markerDistance} yd
                </Text>
              </View>
            </Marker>
          </View>
        )}
      </MapView>
      {marker && (
        <View style={{ position: "absolute", bottom: 15, right: 20 }}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => {
              setMarker(null);
              handleMarkerChange && handleMarkerChange(null);
            }}
          >
            <FontAwesome name="remove" size={24} color="red" />
            <Text style={{ fontSize: 10, color: "red" }}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Map;
