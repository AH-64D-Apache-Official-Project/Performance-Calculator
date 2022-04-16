import { AircraftData } from "./types";

export const defaultAircraft : AircraftData = {
  fcrInstalled: true,
  iafsInstalled: true,
  fuel: 2000,
  pylon1: {type: "none"},
  pylon2: {type: "none"},
  pylon3: {type: "none"},
  pylon4: {type: "none"}
}

const callsignUgly : AircraftData = {
  fcrInstalled: true,
  iafsInstalled: false,
  fuel: 2000,
  pylon1: {type: "hellfire", ul:"AGM-114A", ll:"AGM-114C", ur:undefined, lr:undefined},
  pylon2: {type: "none"},
  pylon3: {type: "none"},
  pylon4: {type: "none"}
}

export const loadouts : {[name:string]: AircraftData} = {
  "Default": defaultAircraft,
  "Ugly": callsignUgly
}