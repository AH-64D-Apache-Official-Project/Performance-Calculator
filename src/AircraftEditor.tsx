import React from 'react'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import {PylonEditor} from './PylonEditor'
import {AircraftData, PylonData} from './types'
import * as perfData from './perfData'
import { KG_TO_LBS } from './constants';

export interface AircraftEditorProps {
  aircraft: AircraftData,
  setAircraft: (ac:AircraftData) => void
}

function AircraftConfiguration({aircraft, setAircraft}: AircraftEditorProps) {
  let fuelFrac: number = aircraft.fuel / aircraftFuelMax(aircraft)

  let setFuelMass = (frac: number) => setAircraft(Object.assign({}, aircraft, {fuel: aircraftFuelMax(aircraft) * frac}))

  return <>
    <Row><h3>Aircraft configuration</h3></Row>
    <Row>
      <Col sm={3}>
        <Form.Check label="FCR Installed?" checked={aircraft.fcrInstalled} onChange={ e => setAircraft(Object.assign({}, aircraft, {fcrInstalled: e.target.checked}))}/>
      </Col>
      <Col sm={3}>
        <Form.Check label="IAFS Installed" checked={aircraft.iafsInstalled} onChange={ e => setAircraft(Object.assign({}, aircraft, {iafsInstalled: e.target.checked}))}/>
      </Col>
      <Col sm={6}>
        <Form.Group>
          <Form.Label>Fuel amount</Form.Label>
          <input type="range" min="0" max="1" step="0.01" value={fuelFrac} onChange={e => setFuelMass(parseFloat(e.target.value))}/><br/>
          {Math.round(fuelFrac * 100).toFixed(0)}% {(aircraft.fuel * KG_TO_LBS).toFixed(0)} lbs
        </Form.Group>
      </Col>
    </Row>
  </>
}

function aircraftFuelMax(aircraft: AircraftData): number {
  let fuel = 0
  function checkPylon (pylon: PylonData) {
    if (pylon.type == "230 Gal") {
      fuel += perfData.maxAuxTankMass
    }
  }
  fuel += perfData.maxFwdFuelMass + perfData.maxAftFuelMass
  if (aircraft.iafsInstalled) {
    fuel += perfData.maxCtrFuelMass
  }
  checkPylon(aircraft.pylon1)
  checkPylon(aircraft.pylon2)
  checkPylon(aircraft.pylon3)
  checkPylon(aircraft.pylon4)
  return fuel
}

function aircraftRoundCount(aircraft: AircraftData): number {
  return aircraft.iafsInstalled ? 300 : 1200
}

export function validateAircraft(aircraft: AircraftData): AircraftData {
  const fuelMax = aircraftFuelMax(aircraft)

  if (aircraft.fuel > fuelMax) {
    return Object.assign({},aircraft, {fuel: fuelMax})
  } else {
    return aircraft
  }
}

function AircraftWeapons({aircraft, setAircraft}: AircraftEditorProps) {
  let roundCount = aircraftRoundCount(aircraft)

  return <>
    <Row><h3>Weapon configuration</h3></Row>
    <Row>
      <Col sm={6}>
        <Form.Group>
          <Form.Label>M230 Quantity</Form.Label>
          <div className="input-group mb-3">
              <input readOnly type="text" className="form-control" value={roundCount.toFixed(0)}/>
              <span className="input-group-text">Rnds</span>
          </div>
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col sm={3} className="pylon-col">
        <h5>Pylon 1</h5>
        <PylonEditor pylon={aircraft.pylon1} setPylon={pylon => setAircraft(Object.assign({}, aircraft, {pylon1: pylon}))}/>
      </Col>
      <Col sm={3} className="pylon-col">
        <h5>Pylon 2</h5>
        <PylonEditor pylon={aircraft.pylon2} setPylon={pylon => setAircraft(Object.assign({}, aircraft, {pylon2: pylon}))}/>
      </Col>
      <Col sm={3} className="pylon-col">
        <h5>Pylon 3</h5>
        <PylonEditor pylon={aircraft.pylon3} setPylon={pylon => setAircraft(Object.assign({}, aircraft, {pylon3: pylon}))}/>
      </Col>
      <Col sm={3} className="pylon-col">
        <h5>Pylon 4</h5>
        <PylonEditor pylon={aircraft.pylon4} setPylon={pylon => setAircraft(Object.assign({}, aircraft, {pylon4: pylon}))}/>
      </Col>
    </Row>
  </>
}

export function AircraftEditor({aircraft, setAircraft}: AircraftEditorProps) {
  return <>
      <AircraftConfiguration aircraft={aircraft} setAircraft={setAircraft}/>
      <AircraftWeapons aircraft={aircraft} setAircraft={setAircraft}/>
    </>
}

export default AircraftEditor
