import { AircraftEnvironment } from "./types"
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

interface EnvironmentEditorProps {
    environment: AircraftEnvironment,
    setEnvironment: (ac:AircraftEnvironment) => void
  }

export function EnvironmentEditor(props:EnvironmentEditorProps) {
    return <Container>
      <Row><h3>Environment</h3></Row>
      <Row>
        <Col sm={6}>
          <Form.Group>
            <Form.Label>Temperature</Form.Label>
            <div className="input-group mb-3">
                <input type="text" className="form-control" disabled value="20"/>
                <span className="input-group-text">{'\u00b0'}C</span>
            </div>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group>
            <Form.Label>Altitude</Form.Label>
            <div className="input-group mb-3">
                <input type="text" className="form-control" disabled value="0"/>
                <span className="input-group-text">ft</span>
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  }