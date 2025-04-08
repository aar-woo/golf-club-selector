import { View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
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
      />
    </View>
  );
};

export default Map;
