import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import moment from 'moment';
import axios from 'axios';

import {
  AppView,
  AppIcon,
  AppImage,
  AppText,
  AppSpinner,
  showError,
} from '../../common';
import { orderStatusNavigationPush } from '../../utils/OrderNavigation';
import colors from '../../common/defaults/colors';
import { refreshList } from '../../actions/list';
import InfoModal from '../InfoModal';
import ConfirmationModal from '../ConfirmationModal';

import { API_ENDPOINT_FOOD_SERVICE } from '../../utils/Config';

const { CancelToken } = axios;

class OrderItem extends Component {
  constructor(props) {
    super(props);

    this.orderStatuses = {
      PENDING: I18n.t('orderDetails-status-pending'),
      ACCEPTED: I18n.t('orderDetails-status-accepted'),
      FINISHED: I18n.t('orderDetails-status-finished'),
      DELIVERED: I18n.t('orderDetails-status-delivered'),
      ARRIVED: I18n.t('orderDetails-status-arrived'),
      REFUSED: I18n.t('orderDetails-status-refused'),
      CANCELLED_BY_CLIENT: I18n.t('orderDetails-status-refused'),
      CANCELLED_BY_COOKER: I18n.t('orderDetails-status-refused'),
      RECIEVED_BY_DELIVERY_PLACE: I18n.t(
        'orderDetails-status-recieved-delivery-place',
      ),
    };

    this.state = {
      loading: false,
      confirmModalVisible: false,
      errorModalVisible: false,
      errorModalMessage: '',
      cancelOrder: false,
    };
    console.log('****', props.data);
  }

  componentWillUnmount() {
    clearInterval(this.creationDateTimer);
    if (this.source) {
      this.source.cancel('Network Operation Canceled.');
    }
  }

  acceptPending = async () => {
    if (this.state.loading) return;
    const { currentUser, data } = this.props;
    const orderId = data.id;

    this.source = CancelToken.source();

    try {
      this.setState({
        loading: true,
        confirmModalVisible: false,
      });

      const res = await axios.put(
        `${API_ENDPOINT_FOOD_SERVICE}orders/${orderId}`,
        {
          status: 'ACCEPTED_BY_PROVIDER',
        },
        {
          cancelToken: this.source.token,
        },
      );

      console.log('res', res);

      this.setState({
        loading: false,
      });

      this.props.refreshList([
        'pendingOrders',
        'acceptedOrders',
        'finishedOrders',
      ]);
    } catch (error) {
      console.log('error', error);

      if (!axios.isCancel(error[0])) {
        let errorMessage = I18n.t('ui-error-happened');

        if (error[2].status) {
          errorMessage = error[2].status;
        } else if (error[1].message) {
          errorMessage = error[1].message;
        }
        setTimeout(() => {
          this.setState({
            loading: false,
            errorModalMessage: errorMessage,
            errorModalVisible: true,
          });
        }, 400);
      }
    }
  };

  cancelOrder = async () => {
    if (this.state.cancelLoading) return;
    const { currentUser, data } = this.props;
    const orderId = data.id;

    this.source = CancelToken.source();

    try {
      this.setState({
        cancelLoading: true,
        confirmModalVisible: false,
      });

      const res = await axios.put(
        `${API_ENDPOINT_FOOD_SERVICE}orders/${orderId}`,
        {
          status: 'REJECTED_BY_PROVIDER',
        },
        {
          cancelToken: this.source.token,
        },
      );

      this.setState({
        cancelLoading: false,
        cancelOrder: false,
        confirmModalVisible: false,
      });

      this.props.refreshList([
        'pendingOrders',
        'acceptedOrders',
        'finishedOrders',
      ]);
    } catch (error) {
      console.log('error', error);

      if (!axios.isCancel(error[0])) {
        let errorMessage = I18n.t('ui-error-happened');

        if (error[2].status) {
          errorMessage = error[2].status;
        } else if (error[1].message) {
          errorMessage = error[1].message;
        }
        setTimeout(() => {
          this.setState({
            cancelLoading: false,
            errorModalMessage: errorMessage,
            errorModalVisible: true,
          });
        }, 400);
      }
    }
  };

  renderIcons = () => (
    <AppView stretch>
      <AppView
        backgroundColor="green"
        center
        padding={3}
        borderRadius={4}
        onPress={() => {
          this.setState({
            confirmModalVisible: true,
          });
        }}
      >
        {this.state.loading ? (
          <AppSpinner size={5} />
        ) : (
          <AppIcon name="check" type="ant" size={8} color="#fff" />
        )}
      </AppView>
      <AppView
        backgroundColor="red"
        center
        padding={3}
        marginTop={2}
        borderRadius={4}
        onPress={() => {
          this.setState({
            confirmModalVisible: true,
            cancelOrder: true,
          });
        }}
      >
        {this.state.cancelLoading ? (
          <AppSpinner size={5} />
        ) : (
          <AppIcon name="close" type="ant" size={8} color="#fff" />
        )}
      </AppView>
    </AppView>
  );

  render() {
    const { data } = this.props;
    return (
      <AppView
        stretch
        marginHorizontal={5}
        paddingVertical={8}
        paddingLeft={6}
        paddingRight={4}
        borderColor={colors.grey}
        borderWidth={0.5}
        borderRadius={5}
        spaceBetween
        backgroundColor="white"
        row
        marginBottom={5}
      >
        <AppView>
          <AppView stretch mb={3}>
            <AppText
              borderColor="grey"
              borderWidth={0.5}
              pv={3}
              borderRadius={5}
              ph={10}
            >
              {this.props.rtl ? data.client.user.name.ar : data.client.user.en}
            </AppText>
          </AppView>
          <AppText>{data.order}</AppText>
        </AppView>
        {data.status === 'PENDING' && this.renderIcons()}
        <InfoModal
          type="error"
          buttonLabel={I18n.t('close2')}
          isVisible={this.state.errorModalVisible}
          message={this.state.errorModalMessage}
          changeState={v => {
            this.setState({
              errorModalVisible: v,
            });
          }}
          onConfirm={() => {
            this.setState({
              errorModalMessage: '',
              errorModalVisible: false,
            });
          }}
        />
        <ConfirmationModal
          isVisible={this.state.confirmModalVisible}
          changeState={v => {
            this.setState({
              confirmModalVisible: v,
            });
          }}
          onCancel={() => {
            this.setState({
              confirmModalVisible: false,
              loading: false,
            });
          }}
          {...this.state.confirmModalData}
          title={
            this.state.cancelOrder
              ? I18n.t('delete')
              : I18n.t('orderDetails-confirm-pending-modal-title')
          }
          desc={
            this.state.cancelOrder
              ? I18n.t('delete-confirm')
              : I18n.t('orderDetails-confirm-pending-modal-desc')
          }
          yesLabel={I18n.t('orderDetails-confirm-pending-modal-yes')}
          noLabel={I18n.t('orderDetails-confirm-pending-modal-no')}
          onConfirm={
            this.state.cancelOrder ? this.cancelOrder : this.acceptPending
          }
        />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  refreshList: bindActionCreators(refreshList, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderItem);
