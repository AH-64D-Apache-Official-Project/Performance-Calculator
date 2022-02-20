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
import { Exporter } from './exporter';

const defaultAircraft : AircraftData = {
  fcrInstalled: true,
  iafsInstalled: true,
  fuel: 2000,
  pylon1: {type: "none"},
  pylon2: {type: "none"},
  pylon3: {type: "none"},
  pylon4: {type: "none"}
}

interface AircraftMenuProps {
  aircraft: AircraftData,
  setAircraft: (ac:AircraftData) => void
}
function AircraftMenu ({aircraft}: AircraftMenuProps) {
  return <Exporter aircraft={aircraft}/>
}

function App() {
  const [aircraft,setAircraft] = useState(defaultAircraft)
  const [environent,setEnvironent] = useState(defaultAircraftEnvironment)

  const perfData = calculatePerformance(aircraft, environent)
  return (
    <div className="App">
      <Container>
        <Row>
          <Col lg="7">
            <AircraftMenu aircraft={aircraft} setAircraft={setAircraft}/>
            <EnvironmentEditor environment={environent} setEnvironment={setEnvironent}/>
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
