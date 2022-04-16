import React from 'react';

import { useState } from 'react';
import './App.css';
import {AircraftEditor, validateAircraft} from './AircraftEditor'
import { calculatePerformance } from './perfCalcs';
import { AircraftPerformanceView } from './PerformanceDisplay';
import { AircraftData,  defaultAircraftEnvironment } from './types';
import { EnvironmentEditor } from './EnvironmentEditor';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { AircraftImportExport } from './AircraftImportExport';
import { defaultAircraft } from './loadouts';

function App() {
  const [aircraft,setAircraftRaw] = useState(defaultAircraft)

  const setAircraft = (ac: AircraftData) => setAircraftRaw(validateAircraft(ac))

  const environment = defaultAircraftEnvironment;

  const perfData = calculatePerformance(aircraft, environment)
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <AircraftImportExport aircraft={aircraft} setAircraft={setAircraft}/>
          </Col>
        </Row>
        <Row>
          <Col lg="7">
            <EnvironmentEditor environment={environment}/>
            <AircraftEditor aircraft={aircraft} setAircraft={(ac:AircraftData) => setAircraft(validateAircraft(ac))}/>
          </Col>
          <Col lg="5">
            <AircraftPerformanceView performance={perfData}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
