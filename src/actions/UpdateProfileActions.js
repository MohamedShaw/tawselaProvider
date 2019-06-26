import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { LOGIN_SUCCESS } from './types';
import { API_ENDPOINT_GATEWAY } from '../utils/Config';
import { AppNavigation, showError } from '../common';

export function updateProfile(values, setSubmitting) {
  return async (dispatch, getState) => {
    const data = new FormData();
    data.append('nameAr', values.nameAr);
    data.append('nameEn', values.nameEn);
    data.append('email', values.email);

    if (
      values.profileImg &&
      values.profileImg !== getState().auth.currentUser.user.profileImage
    ) {
      data.append('profileImage', {
        uri: values.profileImg,
        type: 'image/*',
        name: 'profileImage',
      });
    }

    try {
      const userId = getState().auth.currentUser.user._id;
      console.log('userId', userId);

      const response = await axios.patch(
        `${API_ENDPOINT_GATEWAY}user/${userId}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('data ^^^^^^^^^^', response.data);

      const reduxData = {
        ...getState().auth.currentUser,
        user: response.data,
      };

      console.log('reduxData ********', reduxData);

      dispatch({ type: LOGIN_SUCCESS, payload: reduxData });
      await AsyncStorage.setItem('@CurrentUser', JSON.stringify(reduxData));
      AppNavigation.pop();
    } catch (error) {
      console.log('error ===>>>>>>>>>>>>>', error);
      showError(error[1].message);
      setSubmitting(false);
    }
  };
}
