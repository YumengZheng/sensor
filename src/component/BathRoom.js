import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';


const CheckTrue = (obj) => {
    for (let key in obj) {
        if (obj[key]) {
            return obj[key]
        }
    }
    return false
}

export default class Bathroom extends Component {
    state = {
        lightOn: {},
        doorOpen: {}
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.event) {
            const { sensorType, sensorId } = this.props.event
            //save new light sensor in lightOn object, toggle light sensor that already in the object
            if (sensorType === "light" && prevState.lightOn[sensorId] === this.state.lightOn[sensorId]) {
                const { lightOn } = this.state
                let newlightOn = { ...lightOn }
                newlightOn[sensorId] = newlightOn[sensorId] === undefined ? true : !newlightOn[sensorId]
                this.setState({ lightOn: newlightOn })
            }
            // save new door sensor in doorOpen object, toggle door sensor that already in the object
            if (sensorType === "door" && prevState.doorOpen[sensorId] === this.state.doorOpen[sensorId]) {
                const { doorOpen } = this.state
                let newdoorOpen = { ...doorOpen }
                newdoorOpen[sensorId] = newdoorOpen[sensorId] === undefined ? true : !newdoorOpen[sensorId]
                this.setState({ doorOpen: newdoorOpen })
            }
        }
    }

    render() {
        const { lightOn, doorOpen } = this.state
        //check if there is any door open
        let anyDoorOpen = CheckTrue(doorOpen)
        //check if there is any lights on
        let anyLightsOn = CheckTrue(lightOn)
        return (
            <div>
                {
                    //bathroom is occupied when at least one light is on and doors are not open
                    anyLightsOn && !anyDoorOpen ?
                        <Button bsStyle="danger">OCCUPIED</Button> : <Button bsStyle="success">EMPTY</Button>
                }
            </div>
        )
    }
}

Bathroom.propTypes = {
    event: PropTypes.object
}

Bathroom.defaultProps = {
    event: null
}