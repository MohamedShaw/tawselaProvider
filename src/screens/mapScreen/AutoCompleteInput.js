import React, { Component } from "react";
import I18n from "react-native-i18n";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { connect } from "react-redux";
import {
  moderateScale,
  responsiveHeight
} from "../../common/utils/responsiveDimensions";

import Fonts from "../../common/defaults/fonts";
import styles, { placesAutoCompleteStyle } from "./styles";
import {
  AppView,
  AppButton,
  AppIcon,
  AppNavigation,
  AppText
} from "../../common";

class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  renderSearchIcon = () => (
    <AppView style={styles.searchIconContainer}>
      <AppIcon
        type="custom"
        name="adress"
        marginHorizontal={5}
        color="#8A8A8A"
        size={12}
      />
    </AppView>
  );

  renderBackButtonSearch = () => {
    if (this.props.shouldDisplayListView) {
      return (
        <AppButton onPress={this.props.hideDisplayListView}>
          <AppIcon
            type="ion"
            name="md-close"
            style={{ color: "#303030", marginHorizontal: 5 }}
          />
        </AppButton>
      );
    }

    return (
      <AppButton
        onPress={() => {
          AppNavigation.pop(this.props.componentId);
        }}
      >
        <AppIcon
          type="material"
          name="arrow-right"
          flip
          style={{ color: "#303030", marginHorizontal: 5 }}
        />
      </AppButton>
    );
  };

  render() {
    const {
      onFocus,
      onBlur,
      location,
      listViewDisplayed,
      goToLocation
    } = this.props;
    return (
      <GooglePlacesAutocomplete
        placeholder={I18n.t("map-input-placeholder")}
        listViewDisplayed={listViewDisplayed}
        textInputProps={{
          onFocus,
          onBlur
        }}
        fetchDetails
        ref={this.ref}
        renderDescription={row => row.description}
        renderRightButton={
          this.props.rtl ? this.renderSearchIcon : this.renderBackButtonSearch
        }
        onPress={(data, details = null) => {
          const pos = details.geometry.location;
          goToLocation({ latitude: pos.lat, longitude: pos.lng });
        }}
        getDefaultValue={() => ""}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: `AIzaSyA4UbETI3ANhAO2eNxIwdT-Dei72EY46Vo`,
          language: this.props.lang,
          location,
          radius: "8000"
        }}
        styles={{
          container: {
            marginHorizontal: moderateScale(8),
            zIndex: 10000,
            overflow: "hidden",
            backgroundColor: "#fff",
            position: "absolute",
            top: 20,
            left: 0,
            right: 0,
            borderRadius: 6,
            height: responsiveHeight(9),
            alignItems: "center",
            justifyContent: "center"
          },
          textInputContainer: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            borderTopColor: "#fff",
            borderWidth: 0,
            borderColor: "#fff",
            marginTop: 0,
            borderBottomWidth: 0,
            borderBottomColor: "#fff",
            overflow: "visible"
          },
          textInput: {
            fontFamily: Fonts.normal,
            color: "#000",
            fontSize: 15,
            height: 46,
            textAlign: this.props.rtl ? "right" : "left",
            writingDirection: this.props.rtl ? "rtl" : "ltr",
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 0,
            paddingLeft: this.props.rtl ? 0 : 8,
            paddingRight: this.props.rtl ? 8 : 0,
            flex: 1,
            borderWidth: 0,
            borderColor: "#fff"
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
          loader: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 50,
            bottom: 0
          },
          description: {
            backgroundColor: "#fff",
            zIndex: 1000,
            fontWeight: "bold",
            paddingHorizontal: moderateScale(15),
            borderColor: "#fff",
            borderWidth: 0
          }
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
      />
    );
  }
}

const mapStateToProps = state => ({
  lang: state.lang.lang,
  rtl: state.lang.rtl
});

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(AutoCompleteInput);
