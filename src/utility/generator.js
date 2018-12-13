export const sensorGenerator = () => {
    const roomTypes = ["living", "media", "bathA", "bathB", "frontdoor", "backdoor"]
    let roomIndex = Math.floor(Math.random() * 6);
    let room = roomTypes[roomIndex];
    const sensorTypes = ["motion", "light", "door"]
    let sensorIndex = Math.floor(Math.random() * 3)
    let type = sensorTypes[sensorIndex]
    return {
        room,
        type,
        sensorId: Math.floor(Math.random() * 100000)
    }
}

export const eventGenerator = (sensor) => {
    const { sensorId, type } = sensor
    return {
        time: new Date(),
        eventId: Math.floor(Math.random() * 100000),
        sensorId,
        sensorType: type
    }
}
