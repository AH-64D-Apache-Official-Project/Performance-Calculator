import React from 'react';

import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { AircraftData, PylonData } from "./types"

const quoted = (x:string) => "'" + x + "'"
const arrayed = (...xs:string[]) => "[" + xs.join(", ") + "]"
const booled = (x:boolean) => x ? "true" : "false"
const paired = (x:string, y: string) => arrayed(quoted(x),y)
const numbered = (x:number) => x.toString()

export function Exporter ({aircraft}:{aircraft:AircraftData}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <>
        <Button variant="info" onClick={handleShow}>
            Export
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Export data:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Use the following code in Arma 3 to import this loadout <br/>
                <code>{exporter(aircraft)}</code>
            </Modal.Body>
        </Modal>
    </>
}

export function exporter (x:AircraftData): string {
    return arrayed (
        paired("fcrInstalled", booled(x.fcrInstalled)),
        paired("iafsInstalled", booled(x.iafsInstalled)),
        paired("fuel", numbered(x.fuel)),
        paired("pylon1", exporterPylon(x.pylon1)),
        paired("pylon2", exporterPylon(x.pylon2)),
        paired("pylon3", exporterPylon(x.pylon3)),
        paired("pylon4", exporterPylon(x.pylon4))
    )
}

function exporterPylon (x:PylonData): string {
    switch (x.type) {
        case "none": {
            return arrayed(paired("type", quoted("none")))
        }
        case "hellfire": {
            return arrayed(
                paired("type", quoted("hellfire")),
                paired("ul", quoted(x.ul || "")),
                paired("ur", quoted(x.ur || "")),
                paired("ll", quoted(x.ll || "")),
                paired("lr", quoted(x.lr || "")))
        }
        case "rocket": {
            return arrayed(
                paired("type", quoted("rocket")),
                paired("zoneA", quoted(x.zoneA || "")),
                paired("zoneB", quoted(x.zoneB || "")),
                paired("zoneE", quoted(x.zoneE || "")))
        }
    }
}