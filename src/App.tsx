import React from 'react';

import './App.css';
import {AircraftEditor, validateAircraft} from './AircraftEditor'
import { calculatePerformance } from './perfCalcs';
import { AircraftPerformanceView } from './PerformanceDisplay';
import { AircraftData,  defaultAircraftEnvironment } from './types';
import { EnvironmentEditor } from './EnvironmentEditor';

const defaultAircraft : AircraftData = {
  fcrInstalled: true,
  iafsInstalled: true,
  fuel: 2000,
  pylon1: {type: "none"},
  pylon2: {type: "none"},
  pylon3: {type: "none"},
  pylon4: {type: "none"}
}

function App() {
  const [aircraft,setAircraft] = React.useState(defaultAircraft)
  const [environent,setEnvironent] = React.useState(defaultAircraftEnvironment)

  const perfData = calculatePerformance(aircraft, environent)
  return (
    <div className="App">
      <EnvironmentEditor environment={environent} setEnvironment={setEnvironent}/>
      <AircraftEditor aircraft={aircraft} setAircraft={(ac:AircraftData) => setAircraft(validateAircraft(ac))}/>
      <AircraftPerformanceView performance={perfData}/>
    </div>
  );
}

export default App;
