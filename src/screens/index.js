import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import store from '../store';

import AppPickerModal from './appPickerModal/AppPickerModal';
import SignIn from './signIn/SignIn';
import Walkthrough from './walkthrough/Walkthrough';
import SignUp from './signUp/SignUp';
import ForgetPassword from './forgetPassword/ForgetPassword';
import SendVerificationCode from './forgetPassword/SendVerificationCode';
import ResetPassword from './forgetPassword/ResetPassword';
import PhotoSelection from './photoSelection/PhotoSelection';
import OtpScreen from './otpScreen/OtpScreen';
import ChangePhone from './otpScreen/ChangePhone';
import Home from './home/Home';
import More from './more/More';
import ProviderInfo from './providerInfo/ProviderInfo';
import UpdateProfile from './updateProfile/UpdateProfile';
import ContactUs from './contactUs/ContactUs';
import AboutUs from './aboutUs/AboutUs';
import Plans from './plans/Plans';
import AddPlan from './addPlan/AddPlan';
import CompleteData from './completeData/CompleteData';
import Favorite from './favorites/Favorite';
import TermsAndConditions from './termsAndConditions/TermsAndConditions';
import PrivacyPolicy from './privacyPolicy/PrivacyPolicy';
import MapScreen from './mapScreen/MapScreen';

export default function() {
  const createScene = InternalComponent => () =>
    gestureHandlerRootHOC(
      class SceneWrapper extends Component {
        render() {
          return (
            <Provider store={store}>
              <InternalComponent {...this.props} />
            </Provider>
          );
        }
      },
    );

  Navigation.registerComponent('signIn', createScene(SignIn));
  Navigation.registerComponent('walkthrough', createScene(Walkthrough));

  Navigation.registerComponent('signUp', createScene(SignUp));
  Navigation.registerComponent('forgetPassword', createScene(ForgetPassword));
  Navigation.registerComponent(
    'sendVerificationCode',
    createScene(SendVerificationCode),
  );
  Navigation.registerComponent('resetPassword', createScene(ResetPassword));
  Navigation.registerComponent('appPickerModal', createScene(AppPickerModal));
  Navigation.registerComponent('photoSelection', createScene(PhotoSelection));
  Navigation.registerComponent('otpScreen', createScene(OtpScreen));
  Navigation.registerComponent('changePhone', createScene(ChangePhone));
  Navigation.registerComponent('home', createScene(Home));
  Navigation.registerComponent('more', createScene(More));
  Navigation.registerComponent('providerInfo', createScene(ProviderInfo));
  Navigation.registerComponent('updateProfile', createScene(UpdateProfile));
  Navigation.registerComponent('contactUs', createScene(ContactUs));
  Navigation.registerComponent('aboutUs', createScene(AboutUs));
  Navigation.registerComponent('plans', createScene(Plans));
  Navigation.registerComponent('addPlan', createScene(AddPlan));
  Navigation.registerComponent('completeData', createScene(CompleteData));
  Navigation.registerComponent('favorite', createScene(Favorite));
  Navigation.registerComponent(
    'termsAndConditions',
    createScene(TermsAndConditions),
  );
  Navigation.registerComponent('privacyPolicy', createScene(PrivacyPolicy));
  Navigation.registerComponent('mapScreen', createScene(MapScreen));
}
