import { Mass } from 'safe-units'
import { AircraftData } from './AircraftEditor';

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
  maxGwt: IGEOGE<Mass>,
  gwt: Mass,
  goNoGoTorque: IGEOGE<number>,
  predictedHoverTorque: IGEOGE<number>
}

export function calculatePerformance(aircraft: AircraftData): AircraftPerformance {
  return {
    maxTorqueAvailable: {de: 0.8, se: 0.5},
    contTorqueAvailable: {de: 0.6, se: 0.4},
    maxGwt: {ige: aircraft.fuel, oge: aircraft.fuel.scale(0.5)},
    gwt: aircraft.fuel,
    goNoGoTorque: {ige: 0, oge: 0.5},
    predictedHoverTorque: {ige: 0.2, oge: 0.1}
  }
}