import { PermissionsAndroid, Alert, AppState, Platform } from "react-native";
// import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import BackgroundGeolocation from "react-native-mauron85-background-geolocation";

import I18n from "react-native-i18n";
import OpenSettings from "react-native-open-settings";

import { SET_LOCATION, RESET_LOCATION, SET_GPS_STATUS } from "./types";

let registered = false;
let settingDialogVisible = false;

const showGoToSettingsDialog = () => {
  settingDialogVisible = true;

  Alert.alert(
    I18n.t("ui-dialog-permission-title"),
    I18n.t("ui-dialog-permission-desc"),
    [
      {
        text: I18n.t("ui-dialog-permission-goToSetting"),
        onPress: () => {
          settingDialogVisible = false;
          OpenSettings.openSettings();
        }
      }
    ],
    { cancelable: false }
  );
};

export const checkLocationPermission = async (loop, callback = () => {}) => {
  if (Platform.OS === "ios") {
    callback();
    return;
  }

  const handleAppStateChange = async evt => {
    if (
      Platform.OS === "android" &&
      evt === "active" &&
      !settingDialogVisible
    ) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        showGoToSettingsDialog();
      } else if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setTimeout(() => {
          AppState.removeEventListener("change", handleAppStateChange);
        }, 150);
        callback();
      }
    }
  };

  let granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (!loop) callback();
  else {
    while (granted === PermissionsAndroid.RESULTS.DENIED) {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }

    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      showGoToSettingsDialog();
      setTimeout(() => {
        AppState.addEventListener("change", handleAppStateChange);
      }, 150);
    } else if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setTimeout(() => {
        AppState.removeEventListener("change", handleAppStateChange);
      }, 150);
      callback();
    }
  }
};

export const initBackgroundGeolocation = (dispatch, getState) => {
  if (!registered) {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.LOW_ACCURACY,
      stationaryRadius: 20,
      distanceFilter: 5,
      notificationTitle: "HsClient V2",
      notificationText: "",
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 500,
      fastestInterval: 500,
      activitiesInterval: 1000,
      stopOnStillActivity: true
    });

    BackgroundGeolocation.on("start", () => {
      console.log("[INFO] BackgroundGeolocation service has been started");

      // BackgroundGeolocation.checkStatus(
      //   async ({ isRunning, locationServicesEnabled, authorization }) => {
      //     const isOn =
      //       Platform.OS === "ios"
      //         ? true
      //         : locationServicesEnabled && authorization && isRunning;

      //     dispatch({
      //       type: SET_GPS_STATUS,
      //       payload: isOn
      //     });

      //     if (isOn) {
      //       navigator.geolocation.watchPosition(
      //         data => {
      //           dispatch({
      //             type: SET_LOCATION,
      //             payload: {
      //               latitude: data.coords.latitude,
      //               longitude: data.coords.longitude
      //             }
      //           });
      //         },
      //         () => {},
      //         { enableHighAccuracy: false }
      //       );
      //     }
      //   }
      // );
    });

    BackgroundGeolocation.on("stop", () => {
      console.log("[INFO] BackgroundGeolocation service has been stopped");
    });

    BackgroundGeolocation.on("location", location => {
      console.log("on Location");

      dispatch({
        type: SET_LOCATION,
        payload: { ...location }
      });
    });

    BackgroundGeolocation.on("background", () => {
      // BackgroundGeolocation.stop();
      // BackgroundGeolocation.removeAllListeners();
    });

    BackgroundGeolocation.on("foreground", () => {
      // BackgroundGeolocation.start();
    });

    BackgroundGeolocation.on("authorization", status => {
      BackgroundGeolocation.checkStatus(
        ({ isRunning, locationServicesEnabled, authorization }) => {
          const isOn = locationServicesEnabled && authorization && isRunning;
          dispatch({
            type: SET_GPS_STATUS,
            payload: isOn
          });
        }
      );
    });
  }
  setTimeout(() => {
    BackgroundGeolocation.checkStatus(
      async ({ isRunning, locationServicesEnabled, authorization }) => {
        const isOn =
          Platform.OS === "ios"
            ? true
            : locationServicesEnabled && authorization && isRunning;

        dispatch({
          type: SET_GPS_STATUS,
          payload: isOn
        });

        if (isOn) {
          navigator.geolocation.watchPosition(
            data => {
              dispatch({
                type: SET_LOCATION,
                payload: {
                  latitude: data.coords.latitude,
                  longitude: data.coords.longitude
                }
              });
            },
            () => {},
            { enableHighAccuracy: false }
          );
        }
      }
    );
  }, 1000);

  // BackgroundGeolocation.checkStatus(
  //   ({ isRunning, locationServicesEnabled, authorization }) => {
  //     if (Platform.OS === "ios") {
  //       dispatch({
  //         type: SET_GPS_STATUS,
  //         payload: true
  //       });
  //     } else {
  //       dispatch({
  //         type: SET_GPS_STATUS,
  //         payload: locationServicesEnabled && authorization
  //       });
  //     }
  //   }
  // );

  BackgroundGeolocation.start();
  registered = true;
};
