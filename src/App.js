import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './App.css';
import CommonRoom from './component/CommonRoom';
import BathRoom from './component/BathRoom';
import Door from './component/Door';
import { sensorGenerator, eventGenerator } from './utility/generator';

const SENSORNUMBER = 40;

class App extends Component {
  state = {
    "living": undefined,
    "media": undefined,
    "bathA": undefined,
    "bathB": undefined,
    "frontdoor": undefined,
    "backdoor": undefined,
    //input all the sensors that need to be tested in the sensors array 
    testingSensor: [],
  }

  componentDidMount() {
    let sensors = [];
    for (let i = 0; i < SENSORNUMBER; i++) {
      sensors.push(sensorGenerator());
    }
    this.setState({ sensors });
  }

  startTestingSensor = () => {
    const { sensors, testingSensor } = this.state;
    let sensoronInterval;
    for (let i = 0; i < sensors.length; i++) {
      (() => {
        let { room } = sensors[i];
        sensoronInterval = setInterval(() => {
          let time = 1000 * (Math.floor(Math.random() * 3));
          setTimeout(() => {
            this.setState({ [room]: eventGenerator(sensors[i]) });
          }, time)
        }, 5000)
      })(i)
      testingSensor.push(sensoronInterval);
      this.setState({ testingSensor });
    }
  }

  endTestingSensor = () => {
    const { testingSensor } = this.state;
    for (let i = 0; i < testingSensor.length; i++) {
      clearInterval(testingSensor[i]);
    }
  }

  render() {
    const {
      "living": living,
      "media": media,
      "bathA": bathA,
      "bathB": bathB,
      "frontdoor": frontdoor,
      "backdoor": backdoor
    } = this.state

    return (
      <div className="App">
        <Button bsStyle="success" onClick={this.startTestingSensor}>Start Testing</Button>
        <Button bsStyle="primary" onClick={this.endTestingSensor}>End Testing</Button>

        <div>
          <p>Living Room</p>
          <CommonRoom event={living} />
        </div>
        <div>
          <p>Media Room</p>
          <CommonRoom event={media} />
        </div>
        <div>
          <p>Bath Room A</p>
          <BathRoom event={bathA} />
        </div>
        <div>
          <p>Bath Room B</p>
          <BathRoom event={bathB} />
        </div>
        <div>
          <p>Frontdoor</p>
          <Door event={frontdoor} />
        </div>
        <div>
          <p>Backdoor</p>
          <Door event={backdoor} />
        </div>
      </div >
    );
  }
}

export default App;
