import { AircraftData } from './AircraftEditor';
import './perfCalcs'
import { linearConversion } from './util';
import { InterpTable } from './util';
export interface DESE<T> {
  de: T,
  se: T
}

export interface IGEOGE<T> {
  ige: T,
  oge: T
}

export interface AircraftPerformance {
  maxTorqueAvailable: DESE<number>,
  contTorqueAvailable: DESE<number>,
  maxGwt: IGEOGE<number>,
  gwt: number,
  goNoGoTorque: IGEOGE<number>,
  predictedHoverTorque: IGEOGE<number>
}

const table = new InterpTable([0,1000,10000], [0,50,60])

export function calculatePerformance(aircraft: AircraftData): AircraftPerformance {
  return {
    maxTorqueAvailable: {de: 0.8, se: 0.5},
    contTorqueAvailable: {de: 0.6, se: 0.4},
    maxGwt: {ige: aircraft.fuel, oge: table.interp(aircraft.fuel)},
    gwt: aircraft.fuel,
    goNoGoTorque: {ige: 0, oge: 0.5},
    predictedHoverTorque: {ige: 0.2, oge: 0.1}
  }
}