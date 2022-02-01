import React from 'react';

import './App.css';
import {AircraftData, AircraftEditor, validateAircraft} from './AircraftEditor'
import {Measure, pounds} from 'safe-units'
import { constants } from 'buffer';
import { calculatePerformance } from './perfCalcs';
import { AircraftPerformanceView } from './PerformanceDisplay';

const defaultAircraft : AircraftData = {
  fcrInstalled: true,
  iafsInstalled: true,
  fuel: Measure.of(2000,pounds),
  pylon1: {type: "none"},
  pylon2: {type: "none"},
  pylon3: {type: "none"},
  pylon4: {type: "none"}
}

function App() {
  const [aircraft,setAircraft] = React.useState(defaultAircraft)

  const perfData = calculatePerformance(aircraft)
  return (
    <div className="App">
      <AircraftEditor aircraft={aircraft} setAircraft={(ac:AircraftData) => setAircraft(validateAircraft(ac))}/>
      <AircraftPerformanceView performance={perfData}/>
    </div>
  );
}

export default App;
