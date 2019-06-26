import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { PanResponder, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import posed from 'react-native-pose';
// import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Axios from 'axios';
import AppHeader from '../../components/Header';
import InfoModal from '../../components/InfoModal';
import {
  AppView,
  AppButton,
  AppIcon,
  AppNavigation,
  AppText,
  AppSpinner,
  AppImage,
} from '../../common';
import styles from './styles';
import AutoCompleteInput from './AutoCompleteInput';
import {
  responsiveWidth,
  moderateScale,
} from '../../common/utils/responsiveDimensions';

import { GOOGLE_KEY } from '../../utils/Config';

const { CancelToken } = Axios;

const OpacityAnimatedBox = posed.View({
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
});

class LocationMap extends Component {
  constructor(props) {
    super(props);

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: () => {
        // if (!this.state.moving) {
        //   this.setState({
        //     moving: true,
        //   });
        // }
      },

      onPanResponderEnd: () => {
        this.endMovingTimer = setTimeout(() => {
          this.setState({
            currentLocation: {
              latitude: this.viewportLat,
              longitude: this.viewportLng,
            },
          });

          this.fetchLocationName(this.viewportLat, this.viewportLng);
        }, 2000);
      },
    });

    this.state = {
      currentLocation: props.currentLocation,
      panResponder,
      shouldDisplayListView: false,
      loadingLocationName: true,
      locationNameFetched: false,
      errorModalVisible: false,
      errorModalMessage: '',
      locationNameError: '',
    };

    this.inputRef = React.createRef();
    this.panDragStarts = false;
    this.viewportLat = 0;
    this.viewportLng = 0;

    this.latitudeDelta = 0.007016387588862472;
    this.longitudeDelta = 0.004741139709949493;
  }

  async componentDidMount() {
    if (this.props.ready && this.props.gpsRunning) {
      this.animateToMyLocation();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.gpsRunning != this.props.gpsRunning &&
      nextProps.gpsRunning &&
      nextProps.ready
    ) {
      this.animateToMyLocation(nextProps.currentLocation);
      return;
    }

    if (nextProps.ready !== this.props.ready && nextProps.ready) {
      this.animateToMyLocation(nextProps.currentLocation);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.animateTimer);
    clearTimeout(this.animateTimer2);
    clearTimeout(this.endMovingTimer);
  }

  fetchLocationName = async (lat, lng) => {
    if (this.source) {
      this.source.cancel('Network Operation Canceled.');
    }

    this.setState({
      loadingLocationName: true,
      locationNameFetched: false,
    });
    try {
      this.source = CancelToken.source();
      const response = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_KEY}&language=ar`,
        {
          cancelToken: this.source.token,
        },
      );

      if (response.data.status !== 'OK') {
        throw new Error(`Geocode error: ${response.data.status}`);
      }

      this.source = null;

      this.setState(
        {
          loadingLocationName: false,
          locationNameFetched: true,
          locationNameError: '',
        },
        () => {
          if (this.inputRef.current) {
            this.inputRef.current.ref.current.setAddressText(
              response.data.results[0].formatted_address,
            );
          }
        },
      );
    } catch (error) {
      if (Axios.isCancel(error[0])) {
        console.log('FETCH LOCATION NAME REQUEST CANCELLED');
      } else {
        this.setState({
          loadingLocationName: false,
          locationNameError: I18n.t('unknown-location'),
          // errorModalVisible: true,
          // errorModalMessage: I18n.t('failed-get-your-location'),
        });
      }
    }
  };

  onFocus = () => {
    this.setState({ shouldDisplayListView: true });
  };

  hideDisplayListView = () => {
    this.setState({ shouldDisplayListView: false });
  };

  onBlur = () => {
    this.setState({ shouldDisplayListView: false });
  };

  onMapRegionChange = region => {
    this.viewportLat = region.latitude;
    this.viewportLng = region.longitude;
  };

  animateToMyLocation = async loc => {
    if (loc) {
      this.fetchLocationName(loc.latitude, loc.longitude);
    } else {
      this.fetchLocationName(
        this.props.currentLocation.latitude,
        this.props.currentLocation.longitude,
      );
    }

    this.animateTimer = setTimeout(() => {
      this.setState(
        {
          currentLocation: this.props.currentLocation,
        },
        () => {
          if (this.mapRef) {
            this.mapRef.animateToRegion(
              {
                ...this.props.currentLocation,
                latitudeDelta: this.latitudeDelta,
                longitudeDelta: this.longitudeDelta,
              },
              400,
            );
          }
        },
      );
    }, 1000);
  };

  animateToMyLocation2 = async () => {
    this.fetchLocationName(
      this.props.currentLocation.latitude,
      this.props.currentLocation.longitude,
    );

    this.setState(
      {
        currentLocation: this.props.currentLocation,
      },
      () => {
        if (this.mapRef) {
          this.mapRef.animateToRegion(
            {
              ...this.props.currentLocation,
              latitudeDelta: this.latitudeDelta,
              longitudeDelta: this.longitudeDelta,
            },
            400,
          );
        }
      },
    );
  };

  animateToCustomLocation = customLocation => {
    this.animateTimer2 = setTimeout(() => {
      this.setState(
        {
          currentLocation: customLocation,
        },
        () => {
          if (this.mapRef) {
            this.mapRef.animateToRegion(
              {
                ...customLocation,
                latitudeDelta: this.latitudeDelta,
                longitudeDelta: this.longitudeDelta,
              },
              400,
            );
          }
        },
      );
    }, 1000);
  };

  animateToCustomLocation2 = customLocation => {
    this.setState(
      {
        currentLocation: customLocation,
      },
      () => {
        if (this.mapRef) {
          this.mapRef.animateToRegion(
            {
              ...customLocation,
              latitudeDelta: this.latitudeDelta,
              longitudeDelta: this.longitudeDelta,
            },
            400,
          );
        }
      },
    );
  };

  renderNoGPS = () => (
    <OpacityAnimatedBox
      style={styles.noGPSContainer}
      pose={this.props.gpsRunning ? 'hidden' : 'visible'}
    >
      <AppText size={5} center color="#333">
        {I18n.t('please-open-gps')}
      </AppText>
    </OpacityAnimatedBox>
  );

  renderMyLocationButton = () => (
    <AppButton
      backgroundColor="white"
      borderColor="grey"
      borderWidth={1}
      circleRadius={20}
      style={[
        styles.myLocationButton,
        {
          left: this.props.rtl ? responsiveWidth(5) : undefined,
          right: this.props.rtl ? undefined : responsiveWidth(5),
        },
      ]}
      onPress={() => {
        this.animateToMyLocation2();
      }}
    >
      <AppIcon
        name="location-searching"
        type="material"
        color="primary"
        size={11}
      />
    </AppButton>
  );

  renderConfirmButton = () => (
    <AppView
      style={styles.confirmButton}
      backgroundColor="transparent"
      height={7}
    >
      <AppButton
        borderRadius={0}
        flex
        stretch
        onPress={() => {
          if (this.state.currentLocation) {
            this.props.onLocationChangeCallback(this.state.currentLocation);
            AppNavigation.pop();
          } else {
            this.setState({
              errorModalVisible: true,
              errorModalMessage: I18n.t('failed-get-your-location'),
            });
          }
        }}
      >
        <AppText bold color="white">
          {I18n.t('map-confirm-button')}
        </AppText>
      </AppButton>
    </AppView>
  );

  renderOpenLocationButton = () => (
    <AppView style={styles.spinnerContainer}>
      <AppText>{I18n.t('please-open-gps')}</AppText>
      <AppButton
        backgroundColor="primary"
        marginVertical={6}
        width={50}
        height={5}
        onPress={() => {
          BackgroundGeolocation.showLocationSettings();
        }}
      >
        <AppText color="white">{I18n.t('location-settings')}</AppText>
      </AppButton>
    </AppView>
  );

  renderMap = () => (
    <MapView
      provider="google"
      ref={ref => (this.mapRef = ref)}
      style={styles.container}
      rotateEnabled={false}
      showsUserLocation={false}
      showsMyLocationButton={false}
      showsCompass={false}
      onRegionChange={this.onMapRegionChange}
      onPress={e => {
        this.animateToCustomLocation2(e.nativeEvent.coordinate);
      }}
      {...this.state.panResponder.panHandlers}
    />
  );

  renderMarker = () => {
    if (!this.state.currentLocation || !this.props.ready) return null;

    return (
      <View
        pointerEvents="box-none"
        style={{
          overflow: 'visible',
          zIndex: 1000,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppView width={5} height={12}>
          <AppImage
            source={require('../../assets/imgs/locMarker.png')}
            resizeMode="contain"
            width={10}
            height={8}
          />
        </AppView>
      </View>
    );
  };

  renderMapContainer = () => (
    <AppView flex stretch>
      {this.state.loadingLocationName ? (
        <View style={styles.locationNameContainer}>
          <AppSpinner />
        </View>
      ) : this.state.locationNameError ? (
        <View style={styles.locationNameContainer}>
          <AppText>{this.state.locationNameError}</AppText>
        </View>
      ) : (
        <AutoCompleteInput
          ref={this.inputRef}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          location={
            this.state.currentLocation
              ? `${this.state.currentLocation.latitude},${
                  this.state.currentLocation.longitude
                }`
              : null
          }
          listViewDisplayed={this.state.shouldDisplayListView}
          hideDisplayListView={this.hideDisplayListView}
          goToLocation={this.animateToCustomLocation2}
        />
      )}
      {this.state.locationNameFetched ? this.renderConfirmButton() : null}
      {this.props.ready && this.renderMyLocationButton()}
      {this.renderNoGPS()}
      {this.renderMap()}
      {this.renderMarker()}
    </AppView>
  );

  render() {
    return (
      <React.Fragment>
        <AppHeader title={I18n.t('map-header-title')} />
        {this.props.gpsRunning
          ? this.renderMapContainer()
          : this.renderOpenLocationButton()}

        <InfoModal
          type="warn"
          message={this.state.errorModalMessage}
          isVisible={this.state.errorModalVisible}
          changeState={v => {
            this.setState({
              errorModalVisible: v,
            });
          }}
          onConfirm={() => {
            this.setState({
              errorModalVisible: false,
            });
          }}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.lang.lang,
  rtl: state.lang.rtl,
  currentLocation: state.location.current,
  gpsRunning: state.location.gpsRunning,
  ready: state.location.ready,
});

export default connect(
  mapStateToProps,
  null,
)(LocationMap);
