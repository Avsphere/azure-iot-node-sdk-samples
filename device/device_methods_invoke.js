require('dotenv').config()
const { Mqtt } = require('azure-iot-device-mqtt');
const { Client : HubClient } = require('azure-iothub');
const { promisify } = require('util')


//this invokes method 'lockDoor' on the connected device
const methodParams = {
    methodName : 'lockDoor',
    payload : JSON.stringify({ passengerDoor : true }),
    responseTimeoutInSeconds : 10
}

const run = async() => {
    try {
        const client = HubClient.fromConnectionString(process.env.IOTHUB_CONNECTION_STRING, Mqtt)

        console.log(`Invoking direct method "lockDoor" on deviceId : ${process.env.DEVICE_ID}`)
        const { result } = await client.invokeDeviceMethod(process.env.DEVICE_ID, methodParams)

        console.log('Resulting response from device : ', result)

    } catch (err) {
        console.error('Error: ', err.message)
    }
}

run();