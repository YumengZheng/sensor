import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

//showing activity changes in 60 mins timeline, chart updates every minute.
const TIMELINE = 59
const UPDATETIME = 60000
const currentTime = new Date()
const MINPASSED = currentTime.getMinutes()

export default class CommonRoom extends Component {
    state = {
        data: [],
        minPassed: MINPASSED,
        currentActiveSensor: {}
    }

    componentDidMount() {
        this.refreshChart()
        //update chart every minute
        setInterval(() => {
            const { currentActiveSensor, data, minPassed } = this.state;
            let activity = 0;
            for (let key in currentActiveSensor) {
                activity += currentActiveSensor[key]
            }
            let newData = [...data]
            newData[minPassed + 1] = activity
            if (minPassed === TIMELINE) {
                minPassed = 0
                this.refreshChart()
            }
            this.setState({
                currentActiveSensor: {},
                data: newData,
                minPassed: this.state.minPassed + 1
            })
        }, UPDATETIME)
    }

    refreshChart = () => {
        //make chart ready
        let labels = [];
        let data = [];
        for (let i = 0; i <= TIMELINE; i++) {
            data.push(0)
            labels.push(i)
        }
        //generate fake data for the passed minutes
        let { minPassed } = this.state
        for (let i = 0; i <= minPassed; i++) {
            data[i] = Math.floor(Math.random() * 200)
        }
        this.setState({ data, labels, minPassed })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.event) {
            const { sensorType, sensorId } = this.props.event
            if (sensorType === "motion") {
                //add condition to end infinite loop
                if (prevState.currentActiveSensor[sensorId] === this.state.currentActiveSensor[sensorId]) {
                    let currentActiveSensor = { ...this.state.currentActiveSensor }
                    currentActiveSensor[sensorId] = currentActiveSensor[sensorId] == undefined ? 1 : currentActiveSensor[sensorId] + 1
                    this.setState({ currentActiveSensor })
                }
            }
        }
    }

    render() {
        let data = {
            labels: this.state.labels,
            datasets: [
                {
                    label: "ACTIVITY",
                    data: this.state.data,
                    borderColor: '#878787',
                    borderWidth: 1,
                }
            ]
        }

        return (
            <Line
                data={data}
                width={100}
                height={10}
            />
        )
    }
}

CommonRoom.propTypes = {
    event: PropTypes.object
}

CommonRoom.defaultProps = {
    event: null
}