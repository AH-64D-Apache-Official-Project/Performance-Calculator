import React, { useState } from 'react'
import { AircraftData } from './types'
import { AircraftEditorProps } from './AircraftEditor';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {Save, Upload, Clipboard} from 'react-bootstrap-icons'
import { loadouts } from './loadouts';
import { Alert } from 'react-bootstrap';
import { isAircraftData } from './types.validator';

function AircraftLoadoutPicker({setAircraft} : {setAircraft:(ac:AircraftData) => void}) {
    
    const handleSelect = (name:string) => setAircraft(loadouts[name])

    return <Form.Select className='form-inline' onChange={e => handleSelect(e.target.value)}>
        {Object.keys(loadouts).map(key => <option key={key}>{key}</option>)}
    </Form.Select>
}

function AircraftImportModal({setAircraft} : {setAircraft:(ac:AircraftData) => void}) {
    const [show, setShow] = useState(false)

    const [raw, setRaw] = useState("")

    const handleOpen = () => setShow(true)
    const handleClose = () => setShow(false)

    let parsed:any
    try {
        parsed = JSON.parse(raw)
    } catch {}
    
    const isValid = isAircraftData(parsed)
    function submit() {
        if (!isValid) return;
        setAircraft(parsed)
        handleClose()
    }

    return <>
        <Button variant="primary" onClick={handleOpen}><Upload/> Import</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Import aircraft configuration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Enter configuration here:</p>
                <Form.Control onChange={(e) => setRaw(e.currentTarget.value)} value={raw}></Form.Control>
                {isValid ? <></> : <Alert variant="danger">This is not a valid aircraft</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={submit}>Import</Button>
            </Modal.Footer>
        </Modal>
    </>
}

function AircraftExportModal({aircraft} : {aircraft:AircraftData}) {
    const [show, setShow] = useState(false)

    const handleOpen = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleCopy = () => navigator.clipboard.writeText(JSON.stringify(aircraft))

    return <>
        <Button variant="primary" onClick={handleOpen}><Save/> Export</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Export aircraft configuration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <code>{JSON.stringify(aircraft)}</code>
                </p>
                <Button onClick={handleCopy}><Clipboard/> Copy</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
}

export function AircraftImportExport({aircraft, setAircraft}: AircraftEditorProps) {
    return <div className="importer-bar">
        <div className="importer-preset">
            <span>Presets{' '}</span>
            <AircraftLoadoutPicker setAircraft={setAircraft}/> {' '}
        </div>
        <div className="importer-importexport">
            <AircraftImportModal setAircraft={setAircraft}/> {' '}
            <AircraftExportModal aircraft={aircraft}/>
        </div>
    </div>
}