import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Background from '../../assets/img/banners/banner-1.png';
import { Back, Banner, Brand, Container } from '../../components';
import './RiskInformation.scss';

import { RiskInfoLevel1 } from './components/RiskInfoLevel1';
import { RiskInfoLevel2 } from './components/RiskInfoLevel2';
import { RiskInfoLevel3 } from './components/RiskInfoLevel3';
import { RiskInfoLevel4 } from './components/RiskInfoLevel4';
import { RiskInfoLevel5 } from './components/RiskInfoLevel5';

const RiskInformation = () => {
  const history = useHistory();
  const { triageLevel } = useSelector(state => state.triage);

  const renderRiskHeader = (() => {
    switch (triageLevel) {
      case 'no_risk': {
        return 'PRZESTRZEGAJ PROFILAKTYKI';
      }
      case 'self_monitoring': {
        return 'SAMOOBSERWACJA - POZOSTAŃ W DOMU I MONITORUJ STAN ZDROWIA';
      }
      case 'quarantine': {
        return 'SAMOOBSERWACJA - POZOSTAŃ W DOMU I MONITORUJ STAN ZDROWIA';
      }
      case 'isolation_call': {
        return 'IZOLACJA DOMOWA. UNIKAJ KONTAKTU Z DOMOWNIKAMI. SKONTAKTUJ SIĘ Z NUMEREM ALARMOWYM.';
      }
      case 'isolation_ambulance': {
        return 'BEZWZGLĘDNIE NIE OPUSZCZAJ DOMU. OBOWIĄZKOWY KONTAKT Z NUMEREM ALARMOWYM.';
      }
      default: {
        return null;
      }
    }
  })();

  const renderRiskHeaderColor = (() => {
    switch (triageLevel) {
      case 'no_risk': {
        return 'blue';
      }
      case 'self_monitoring': {
        return 'blue';
      }
      case 'quarantine': {
        return 'warning';
      }
      case 'isolation_call': {
        return 'error';
      }
      case 'isolation_ambulance': {
        return 'error';
      }
      default: {
        return null;
      }
    }
  })();

  const renderRiskInformation = (() => {
    switch (triageLevel) {
      case 'no_risk': {
        return <RiskInfoLevel1 />;
      }
      case 'self_monitoring': {
        return <RiskInfoLevel2 />;
      }
      case 'quarantine': {
        return <RiskInfoLevel3 />;
      }
      case 'isolation_call': {
        return <RiskInfoLevel4 />;
      }
      case 'isolation_ambulance': {
        return <RiskInfoLevel5 />;
      }
      default: {
        return null;
      }
    }
  })();

  return (
    <div className="view view__risk-information">
      <Banner background={Background}>
        <Back onClick={() => history.push('/')} />
        <Brand content={false} small white />
      </Banner>
      <Container>
        <h4 className={`text-${renderRiskHeaderColor}`}>{renderRiskHeader}</h4>
        <div className="content">
          {renderRiskInformation}
        </div>
      </Container>
    </div>
  );
};

export default RiskInformation;