import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';

function App() {
  return (
    <div className="App">
      <Container>
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
        <Row><h3>Aircraft configuration</h3></Row>
        <Row>
          <Col sm={3}>
            <Form.Check label="FCR Installed?"/>
          </Col>
          <Col sm={3}>
            <Form.Check label="IAFS Installed"/>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Fuel amount</Form.Label>
              <Form.Range/><br/>
              10% 1000lbssa
            </Form.Group>
          </Col>
        </Row>
        <Row><h3>Weapon configuration</h3></Row>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>M230 Quantity</Form.Label>
              <div className="input-group mb-3">
                  <input type="text" className="form-control" value="0"/>
                  <span className="input-group-text">Rnds</span>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <h5>Pylon 1</h5>
            <Form.Select><option>M299 HML</option></Form.Select>
            <Form.Select><option>AGM-114K</option></Form.Select>
            <Form.Select><option>AGM-114K</option></Form.Select>
            <Form.Select><option>AGM-114L</option></Form.Select>
            <Form.Select><option>AGM-114L</option></Form.Select>
          </Col>
          <Col sm={3}>
            <h5>Pylon 2</h5>
            <Form.Select><option>Not installed</option></Form.Select>
          </Col>
          <Col sm={3}>
            <h5>Pylon 3</h5>
            <Form.Select><option>Not installed</option></Form.Select>
          </Col>
          <Col sm={3}>
            <h5>Pylon 4</h5>
            <Form.Select><option>M261 Pod</option></Form.Select>
            <Form.Select><option>M151 HEDP</option></Form.Select>
            <Form.Select><option>M267 MPSM</option></Form.Select>
            <Form.Select><option>M259 WP</option></Form.Select>
          </Col>
        </Row>
        <Row><h3>Aircraft performance</h3></Row>
        <Row>
          <p><b>Gross weight:</b> 99999lbs</p>
        </Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>DE</th>
                <th>SE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Max Torque Available</td>
                <td>234%</td>
                <td>567%</td>
              </tr>
              <tr>
                <td>Continuous Torque Available</td>
                <td>234%</td>
                <td>567%</td>
              </tr>
              <tr><td style={{height: "20px"}}>{' '}</td></tr>
            </tbody>
            <thead>
              <tr>
                <th></th>
                <th>IGE</th>
                <th>OGE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Max GWT</td>
                <td>9999lbs</td>
                <td>9999lbs</td>
              </tr>
              <tr>
                <td>Go/No-go torque</td>
                <td>234%</td>
                <td>567%</td>
              </tr>
            </tbody>
            <thead><tr></tr></thead>
            <tbody>
              <tr>
                <td>Predicted Hover Torque</td>
                <td>234%</td>
                <td>567%</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default App;
