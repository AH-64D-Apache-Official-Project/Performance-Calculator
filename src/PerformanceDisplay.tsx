import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import { AircraftPerformance } from './perfCalcs'
import { KG_TO_LBS } from './constants'

function showPercentage(percentage:number):string {
  return (percentage * 100).toFixed(0)+"%"
}

function showPounds(mass:number):string {
  return mass.toFixed(0) + " lbs"
}

export function AircraftPerformanceView({performance}: {performance:AircraftPerformance}) {
  return <Alert className="performance-results">
      <h3>Aircraft performance</h3>
      <p><b>Gross weight:</b> {showPounds(performance.gwt * KG_TO_LBS)}</p>
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
            <td>{showPercentage(performance.contTorqueAvailable.de)}</td>
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
    </Alert>
}