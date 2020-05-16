import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UploadData } from './components/UploadData';
import {
  endUploadHistoricalData,
  uploadHistoricalData
} from '../../store/actions/nativeData';
import { UploadSuccess } from './components/UploadSuccess';
import { UPLOAD_HISTORICAL_DATA_STATE as uploadState } from '../../store/reducers/app/app.constants';
import Routes from '../../routes';
import UploadInProgress from './components/UploadInProgress/UploadInProgress';
import { getBanData, createErrorMessage } from './helpers/ban-pin-tries';

const UploadHistoricalData = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { name: userName } = useSelector(state => state.user);
  const {
    uploadHistoricalDataState: { status, unsuccessfulAttempts } = {
      status: uploadState.EMPTY
    }
  } = useSelector(state => state.app);

  const [pin, setPin] = useState('');
  const [banData, setBanData] = useState(null);

  useEffect(() => {
    if (unsuccessfulAttempts) {
      const banInfo = getBanData(unsuccessfulAttempts);
      setBanData(banInfo);
    }
  }, [unsuccessfulAttempts]);

  useEffect(() => {
    if (banData && banData.lockdownTime) {
      const timer = setTimeout(() => {
        setBanData(getBanData(unsuccessfulAttempts));
      }, banData.lockdownTime);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [banData, unsuccessfulAttempts]);

  const uploadData = () => {
    const data = {
      pin
    };
    dispatch(uploadHistoricalData(data));
  };

  const finishUpload = () => {
    dispatch(endUploadHistoricalData()).then(history.push(Routes.Home));
  };

  if (status === uploadState.REQUESTED) {
    return <UploadInProgress />;
  }

  if (status === uploadState.SUCCESS) {
    return <UploadSuccess finishUpload={finishUpload} />;
  }
  const getErrorMessage = () =>
    banData && createErrorMessage(banData, unsuccessfulAttempts.length);
  return (
    <>
      <UploadData
        disableButton={status === uploadState.REQUESTED}
        disablePinInput={Boolean(banData && banData.lockdownTime)}
        errorMessage={getErrorMessage()}
        onUploadData={uploadData}
        pin={pin}
        setPin={setPin}
        userName={userName}
      />
    </>
  );
};

export default UploadHistoricalData;
