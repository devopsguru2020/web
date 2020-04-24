import {
  ONBOARDING_BLUETOOTH_PERMISSION_SHOWED,
  ONBOARDING_IOS_BLUETOOTH_SUMMARY_SHOWED,
  ONBOARDING_NOTIFICATION_PERMISSION_SHOWED
} from '../../types/app';

const INITIAL_STATE = {
  onboardingNotificationPermissionShowed: false,
  onboardingBluetoothPermissionShowed: false,
  iosBluetoothSummaryShowed: false
};
const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ONBOARDING_NOTIFICATION_PERMISSION_SHOWED:
      return {
        ...state,
        onboardingNotificationPermissionShowed: true
      };
    case ONBOARDING_BLUETOOTH_PERMISSION_SHOWED:
      return {
        ...state,
        onboardingBluetoothPermissionShowed: true
      };
    case ONBOARDING_IOS_BLUETOOTH_SUMMARY_SHOWED:
      return {
        ...state,
        iosBluetoothSummaryShowed: true
      };
    default:
      return state;
  }
};

export default appReducer;