import { StyleSheet } from "react-native";

import Colors from "../../common/defaults/colors";

import Fonts from "../../common/defaults/fonts";
import {
  responsiveWidth,
  responsiveHeight,
  moderateScale
} from "../../common/utils/responsiveDimensions";

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100
  },
  locationNameContainer: {
    zIndex: 10000,
    height: responsiveHeight(9),
    borderRadius: 6,
    position: "absolute",
    top: 20,
    left: moderateScale(8),
    right: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    borderWidth: 0,
    backgroundColor: "#fff",
    borderColor: "#fff"
  },
  confirmButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 200
  },
  myLocationButton: {
    position: "absolute",
    bottom: responsiveHeight(12),
    zIndex: 500
  },
  markerIcon: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  searchIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: moderateScale(2)
  },
  noGPSContainer: {
    backgroundColor: "white",
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    top: 150,
    left: responsiveWidth(20),
    right: responsiveWidth(20),
    borderColor: Colors.borderColor,
    zIndex: 5000
  },
  spinnerContainer: {
    position: "absolute",
    alignItems: "center",
    top: responsiveHeight(25),
    left: 0,
    right: 0,
    zIndex: 1000
  }
});

export const placesAutoCompleteStyle = {
  container: {
    margin: 20,
    zIndex: 10000,
    overflow: "visible",
    backgroundColor: "#fff",
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    borderRadius: 5
  },
  textInputContainer: {
    backgroundColor: "#fff",

    height: 56,
    borderTopWidth: 0,
    marginTop: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: 45,
    overflow: "visible",
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 100
  },
  textInput: {
    fontFamily: Fonts.normal,
    color: "#979797",
    fontSize: 15,
    height: 46,
    textAlign: "right",
    writingDirection: "rtl",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    paddingRight: 5,
    borderBottomWidth: 0,
    borderBottomColor: "#fff",
    lineHeight: 22.5,
    paddingBottom: 0,
    flex: 1
  },
  predefinedPlacesDescription: {
    color: "#1faadb"
  },
  poweredContainer: {
    width: 0,
    height: 0
  },
  powered: {
    width: 0,
    height: 0
  },
  listView: {},
  description: {
    backgroundColor: "#fff",
    zIndex: 1000,
    fontWeight: "bold",
    paddingHorizontal: moderateScale(15)
  }
};
