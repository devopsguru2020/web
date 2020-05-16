import React from 'react';
import PinInput from 'react-pin-input';
import Header from '../../../../components/Header/Header';
import { BottomNavigation } from '../../../../components/BottomNavigation';
import { Button, InfoIcon } from '../../../../components';
import PhoneNumber from '../../../../components/PhoneNumber';
import { Container, Content, View } from '../../../../theme/grid';
import { Paragraph } from '../../../../theme/typography';
import { Color } from '../../../../theme/colors';
import {
  Name,
  PinWrapper,
  ButtonWrapper
} from '../../UploadHistoricalData.styled';

import InformationIcon from '../../../../assets/img/icons/bad.svg';
import WarningIcon from '../../../../assets/img/icons/warning.svg';

const UploadData = ({
  disableSubmitButton,
  errorMessage,
  onUploadData,
  pin,
  setPin,
  userName,
  disablePinInput
}) => {
  return (
    <View>
      <Header hideBackButton />
      <Content>
        <Container className="full-height">
          <Name>{userName},</Name>
          <Paragraph>
            aby potwierdzić Operatorowi Centrum Kontaktu swój stan zdrowia wpisz
            poniżej KOD PIN który otrzymałeś od niego w wiadomości SMS
          </Paragraph>
          <PinWrapper>
            <PinInput
              disabled={disablePinInput}
              initialValue={pin}
              focus
              length={6}
              type="text"
              onChange={value => setPin(value)}
              inputStyle={{ borderColor: Color.lightGray }}
            />
          </PinWrapper>
          {errorMessage ? (
            <InfoIcon icon={WarningIcon}>
              <Paragraph color={Color.danger}>{errorMessage}</Paragraph>
            </InfoIcon>
          ) : null}
          <ButtonWrapper>
            <Button
              onClick={onUploadData}
              text="Przekaż dane"
              disabled={
                pin.length !== 6 || disableSubmitButton || disablePinInput
              }
            />
          </ButtonWrapper>
          {errorMessage ? (
            <InfoIcon icon={InformationIcon}>
              <Paragraph>
                <strong>Potrzebna pomoc?</strong>
                <br /> Skontaktuj się z Centrum Pomocy:{' '}
                <PhoneNumber value="800123123">800 123 123</PhoneNumber>
              </Paragraph>
            </InfoIcon>
          ) : null}
        </Container>
        <BottomNavigation />
      </Content>
    </View>
  );
};

export default UploadData;
