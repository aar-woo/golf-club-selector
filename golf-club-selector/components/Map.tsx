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
import {
  computeDestinationPoint,
  convertDistance,
  getRhumbLineBearing,
} from "geolib";
import colors from "@/consts/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DISTANCE_CONFIG, {
  InputDirection,
  YARD_TO_METER_CONVERSION_FACTOR,
} from "@/consts/constants";
const { DRAG_INCREMENT } = DISTANCE_CONFIG;

interface MapProps {
  width?: number;
  height?: number;
  fullScreen?: boolean;
  markerDistance?: number | null;
  handleMarkerChange?: (distance: number | null) => void;
  inputDistance?: number | null;
  inputDirection?: InputDirection | null;
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
  inputDistance,
  inputDirection,
}: MapProps) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [marker, setMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [lineCoordinates, setLineCoordinates] = useState<{
    start: { latitude: number; longitude: number };
    end: { latitude: number; longitude: number };
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
    location: { latitude: number; longitude: number }
  ) => {
    let distance = getDistance(marker, location);
    distance = Math.round(convertDistance(distance, "yd"));
    return distance;
  };

  useEffect(() => {
    if (marker && location) {
      const distance = calculateDistance(marker, location.coords);

      handleMarkerChange && handleMarkerChange(distance);
    }
  }, [marker, location]);

  useEffect(() => {
    if (marker && location) {
      setLineCoordinates({
        start: {
          latitude: marker.latitude,
          longitude: marker.longitude,
        },
        end: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    }
  }, [marker, location]);

  useEffect(() => {
    if (
      (inputDistance || inputDistance === 0) &&
      markerDistance &&
      location &&
      marker
    ) {
      if (inputDistance === 0) {
        setMarker(null);
        return;
      }

      const bearing = getRhumbLineBearing(location.coords, marker);
      let increment;
      let yardsToMeters;

      if (Math.abs(inputDistance - markerDistance) >= 100) {
        increment =
          inputDirection === "left" ? -DRAG_INCREMENT : DRAG_INCREMENT;
        yardsToMeters = increment * YARD_TO_METER_CONVERSION_FACTOR;
      } else {
        increment = inputDirection === "left" ? -1 : 1;
        yardsToMeters = Math.round(increment * YARD_TO_METER_CONVERSION_FACTOR);
      }

      const newMarkerCoords = computeDestinationPoint(
        marker,
        yardsToMeters,
        bearing
      );

      setMarker(newMarkerCoords);
    }
  }, [inputDistance]);

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

          location &&
            setLineCoordinates({
              start: {
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
              },
              end: {
                latitude: latitude,
                longitude: longitude,
              },
            });
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
        {marker && location && lineCoordinates && (
          <View>
            <Polyline
              coordinates={[lineCoordinates.start, lineCoordinates.end]}
              strokeColor={colors.gray}
              strokeWidth={1}
              lineDashPattern={[3, 3]}
            />
            <Marker
              coordinate={{
                latitude:
                  (lineCoordinates.start.latitude +
                    lineCoordinates.end.latitude) /
                  2,
                longitude:
                  (lineCoordinates.start.longitude +
                    lineCoordinates.end.longitude) /
                  2,
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
              setLineCoordinates(null);
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
