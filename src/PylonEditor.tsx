import React from 'react'
import Form from 'react-bootstrap/Form'

export type PylonData = PylonArmamentNone | PylonArmamentHellfire | PylonArmamentRocket

export interface PylonArmamentNone {
  type: "none"
}

export interface PylonArmamentHellfire {
  type: "hellfire",
  ul: HellfireType,
  ur: HellfireType,
  ll: HellfireType,
  lr: HellfireType
}

export type HellfireType = void | "AGM-114K" | "AGM-114L"

export interface PylonArmamentRocket {
  type: "rocket",
  zoneA: RocketType,
  zoneB: RocketType,
  zoneE: RocketType
}

export type RocketType = void | "M229"

interface PylonEditorProps {
    pylon: PylonData,
    setPylon: (pylon: PylonData) => void
}

function pylonDefaultValue(typ: string): PylonData {
  switch (typ) {
    case "rocket": return {type: "rocket", zoneA: undefined, zoneB: undefined, zoneE: undefined};
    case "hellfire": return {type: "hellfire", ul: undefined, ur: undefined, ll:undefined, lr:undefined};
    default: return {type: "none"};
  }
}

function PylonType({pylon, setPylon}: PylonEditorProps) {
  return <Form.Select value={pylon.type} onChange={e => setPylon(pylonDefaultValue(e.target.value))}>
    <option value="none">None</option>
    <option value="rocket">Rocket</option>
    <option value="hellfire">Hellfire</option>
  </Form.Select>
}

function RocketTypeSelect({rocket,setRocket}: {rocket: RocketType, setRocket: ((x:RocketType) => void)}) {
  return <Form.Select value={rocket as string} onChange={e => setRocket(e.target.value as any as RocketType)}>
    <option value="">None</option>
    <option>M229</option>
  </Form.Select>
}

function HellfireTypeSelect({hellfire,setHellfire}: {hellfire: HellfireType, setHellfire: ((x:HellfireType) => void)}) {
  return <Form.Select value={hellfire as string} onChange={e => setHellfire(e.target.value as any as HellfireType)}>
    <option value={undefined}>None</option>
    <option>AGM-114K</option>
    <option>AGM-114L</option>
  </Form.Select>
}
  
export function PylonEditor({pylon,setPylon}: PylonEditorProps) {
  switch (pylon.type) {
      case "none": return <PylonType pylon={pylon} setPylon={setPylon}/>
      case "rocket": return <>
        <PylonType pylon={pylon} setPylon={setPylon}/>
        <RocketTypeSelect rocket={pylon.zoneA} setRocket={rocket => setPylon(Object.assign({},pylon,{zoneA: rocket}))}/>
        <RocketTypeSelect rocket={pylon.zoneB} setRocket={rocket => setPylon(Object.assign({},pylon,{zoneB: rocket}))}/>
        <RocketTypeSelect rocket={pylon.zoneE} setRocket={rocket => setPylon(Object.assign({},pylon,{zoneE: rocket}))}/>
      </>
      case "hellfire": return <>
        <PylonType pylon={pylon} setPylon={setPylon}/>
        <HellfireTypeSelect hellfire={pylon.ll} setHellfire={hellfire => setPylon(Object.assign({},pylon,{ll: hellfire}))}/>
        <HellfireTypeSelect hellfire={pylon.lr} setHellfire={hellfire => setPylon(Object.assign({},pylon,{lr: hellfire}))}/>
        <HellfireTypeSelect hellfire={pylon.ul} setHellfire={hellfire => setPylon(Object.assign({},pylon,{ul: hellfire}))}/>
        <HellfireTypeSelect hellfire={pylon.ur} setHellfire={hellfire => setPylon(Object.assign({},pylon,{ur: hellfire}))}/>
      </>
  }
}