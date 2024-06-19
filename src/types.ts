export interface AircraftData {
    fcrInstalled: boolean,
    iafsInstalled: boolean,
    fuel: number,
    pylon1: PylonData,
    pylon2: PylonData,
    pylon3: PylonData,
    pylon4: PylonData
}

export type PylonData = PylonArmamentNone | PylonArmamentHellfire | PylonArmamentRocket | PylonAuxilaryTank

export interface PylonArmamentNone {
    type: "none"
}

export interface PylonArmamentHellfire {
    type: "hellfire",
    ul?: HellfireType,
    ur?: HellfireType,
    ll?: HellfireType,
    lr?: HellfireType
}

export type HellfireType = "AGM-114A" | "AGM-114C" | "AGM-114K" | "AGM-114L" | "AGM-114M" | "AGM-114N" 

export interface PylonArmamentRocket {
    type: "rocket",
    zoneA?: RocketType,
    zoneB?: RocketType,
    zoneE?: RocketType
}

export type RocketType = "M151 10LB" | "M229 17LB" | "M251 FLEC" | "M261 MPSM" | "M257 ILUM"

export interface PylonAuxilaryTank {
    type: "230 Gal"
}

export interface AircraftEnvironment {
    temp: number,
    altitude: number,
}

export const defaultAircraftEnvironment:AircraftEnvironment = {
    temp: 20,
    altitude: 0
}