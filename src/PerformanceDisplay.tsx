import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import { Mass, pounds } from 'safe-units'
import { AircraftPerformance } from './perfCalcs'

function showPercentage(percentage:number):string {
  return (percentage * 100).toFixed(0)+"%"
}

function showPounds(mass:Mass):string {
  return mass.in(pounds, {formatValue: (x:number) => x.toFixed(0)})
}

export function AircraftPerformanceView({performance}: {performance:AircraftPerformance}) {
  return <Container>
    <Row>
      <p><b>Gross weight:</b> {showPounds(performance.gwt)}</p>
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
            <td>{showPercentage(performance.maxTorqueAvailable.de)}</td>
            <td>{showPercentage(performance.maxTorqueAvailable.se)}</td>
          </tr>
          <tr>
            <td>Continuous Torque Available</td>
            <td>{showPercentage(performance.contTorqueAvailable.se)}</td>
            <td>{showPercentage(performance.contTorqueAvailable.se)}</td>
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
            <td>{showPounds(performance.maxGwt.ige)}</td>
            <td>{showPounds(performance.maxGwt.oge)}</td>
          </tr>
          <tr>
            <td>Go/No-go torque</td>
            <td>{showPercentage(performance.goNoGoTorque.ige)}</td>
            <td>{showPercentage(performance.goNoGoTorque.oge)}</td>
          </tr>
        </tbody>
        <thead><tr></tr></thead>
        <tbody>
          <tr>
            <td>Predicted Hover Torque</td>
            <td>{showPercentage(performance.predictedHoverTorque.ige)}</td>
            <td>{showPercentage(performance.predictedHoverTorque.oge)}</td>
          </tr>
        </tbody>
      </Table>
    </Row>
  </Container>
}