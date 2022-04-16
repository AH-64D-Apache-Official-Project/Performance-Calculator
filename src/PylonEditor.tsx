import React from 'react'
import Form from 'react-bootstrap/Form'
import {PylonData, RocketType, HellfireType} from './types'
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

function RocketTypeSelect({rocket,setRocket}: {rocket: RocketType | undefined, setRocket: ((x:RocketType | undefined) => void)}) {
  return <Form.Select value={rocket as string} onChange={e => setRocket(e.target.value as any as RocketType)}>
    <option value="">None</option>
    <option>M151 HEDP "10LB"</option>
    <option>M229 HEDP "17LB"</option>
    <option>M255A1 FLECHETTE</option>
    <option>M261 MPSM</option>
    <option>M257 ILLUM</option>
  </Form.Select>
}

function HellfireTypeSelect({hellfire,setHellfire}: {hellfire: HellfireType | undefined, setHellfire: ((x:HellfireType | undefined) => void)}) {
  return <Form.Select value={hellfire as string} onChange={e => setHellfire(e.target.value as any as HellfireType)}>
    <option value={undefined}>None</option>
    <option>AGM-114A</option>
    <option>AGM-114C</option>
    <option>AGM-114K</option>
    <option>AGM-114L</option>
    <option>AGM-114M</option>
    <option>AGM-114N</option>
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