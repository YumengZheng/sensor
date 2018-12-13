import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Door extends Component {
    state = {
        doorOpen: true,
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.event) {
            const { sensorType } = this.props.event
            //door sensor sense changing, toggle door status
            if (sensorType === "door" && prevState.doorOpen === this.state.doorOpen) {
                this.setState({ doorOpen: !prevState.doorOpen });
            }
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.doorOpen ?
                        <Button bsStyle="danger">DOOR OPEN</Button> : <Button bsStyle="success">DOOR CLOSED</Button>
                }
            </div>
        )
    }
}


Door.propTypes = {
    event: PropTypes.object
}

Door.defaultProps = {
    event: null
}