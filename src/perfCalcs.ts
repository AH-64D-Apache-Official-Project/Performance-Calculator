import './perfCalcs'
import * as perfData from './perfData';
import { clamp } from './util';
import { AircraftData, AircraftEnvironment, HellfireType, PylonData, RocketType } from './types';
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

const rocketPodWeight    = 0; //2.07;  //39.4kg / 19 rockets
const hellfireRackWeight = 0; //16.22; //64.9kg / 4 missiles

function rocketWeight(type: RocketType | undefined): number {
    if (typeof type === "undefined") return 0
    return 12.50;
}

function hellfireWeight(type: HellfireType | undefined): number {
    if (typeof type === "undefined") return 0
    return 62.94;
}

function pylonWeight(pylon: PylonData): number {
  switch (pylon.type) {
    case "none": return 0;
    case "hellfire": return hellfireRackWeight
      + hellfireWeight(pylon.ll)
      + hellfireWeight(pylon.lr)
      + hellfireWeight(pylon.ul)
      + hellfireWeight(pylon.ur)
    case "rocket": return rocketPodWeight
      + rocketWeight(pylon.zoneA) * 12
      + rocketWeight(pylon.zoneB) * 4
      + rocketWeight(pylon.zoneE) * 3
  }
}

export const m230RndWgt = 0.349

export function calculatePerformance(aircraft: AircraftData, environment: AircraftEnvironment): AircraftPerformance {
  const basicWgt = aircraft.fcrInstalled ? perfData.emptyMassFCR : perfData.emptyMassNonFCR;
  const fuelWgt  = aircraft.fuel;
  const pylonWgt = pylonWeight(aircraft.pylon1) + pylonWeight(aircraft.pylon2) + pylonWeight(aircraft.pylon3) + pylonWeight(aircraft.pylon4)
  const m230Wgt  = aircraft.iafsInstalled ? m230RndWgt * 300 : m230RndWgt * 1200;

  const grossWgt = basicWgt + fuelWgt + pylonWgt + m230Wgt;

  const maxTqDE = perfData.maxTqDE.interp(environment.temp, environment.altitude);
  const maxTqSE = perfData.maxTqSE.interp(environment.temp, environment.altitude);

  const maxGwtIGE = perfData.maxGwtIGE.interp(environment.temp, environment.altitude);
  const maxGwtOGE = perfData.maxGwtOGE.interp(environment.temp, environment.altitude);

  const goNoGoTqIGE = perfData.goNoGoTqIGE.interp(environment.temp, environment.altitude);
  const goNoGoTqOGE = perfData.goNoGoTqOGE.interp(environment.temp, environment.altitude);
  
  const predictedHoverTorqueIGE = perfData.hvrTqIGE.interp(grossWgt);
  const predictedHoverTorqueOGE = perfData.hvrTqOGE.interp(grossWgt);

  //const fuelFlowOGE = perfData.fue

  return {
    maxTorqueAvailable: {de: maxTqDE, se: maxTqSE},
    contTorqueAvailable: {de: clamp(0, 1, maxTqDE), se: clamp(0, 1.10, maxTqSE)},
    maxGwt: {ige: maxGwtIGE, oge: maxGwtOGE},
    gwt: grossWgt,
    goNoGoTorque: {ige: goNoGoTqIGE, oge: goNoGoTqOGE},
    predictedHoverTorque: {ige: predictedHoverTorqueIGE, oge: predictedHoverTorqueOGE}
  }
}