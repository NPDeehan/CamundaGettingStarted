import React from 'react';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';
import { Button } from 'react-native';

class CamundaGettingStarted extends React.Component {
  render() {
    const handlePress = () => false;
    return <Button onPress={handlePress} title="Red button!" color="red" />;
  }
}

export default CamundaGettingStarted;
